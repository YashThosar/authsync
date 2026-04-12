import cv2
import numpy as np
from deepface import DeepFace


class FaceDetector:
    def __init__(self):
        self.model_name = "Facenet"
        self.threshold = 0.6
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        )

    def detect_face(self, image_path):
        frame = cv2.imread(image_path)

        if frame is None:
            print("Error: Image not found!")
            return None

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.05,
            minNeighbors=8,
            minSize=(80, 80)
        )

        print(f"Faces found: {len(faces)}")

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, "Face Detected", (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        frame = cv2.resize(frame, (640, 480))
        cv2.imshow("AuthSync - Face Detection", frame)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        return len(faces) > 0

    def get_encoding(self, image_path):
        try:
            embedding = DeepFace.represent(
                img_path=image_path,
                model_name=self.model_name,
                enforce_detection=False
            )
            print("Face encoding generated successfully!")
            return embedding[0]['embedding']

        except Exception as e:
            print(f"Error generating encoding: {e}")
            return None

    def match_face(self, new_encoding, stored_voters):
        if not stored_voters:
            print("No voters in database yet!")
            return None, False

        best_match_name = None
        best_match_distance = float('inf')

        for voter in stored_voters:
            stored_encoding = np.array(voter['encoding'])
            new_encoding_arr = np.array(new_encoding)

            distance = np.linalg.norm(stored_encoding - new_encoding_arr)

            if distance < best_match_distance:
                best_match_distance = distance
                best_match_name = voter['name']

        print(f"Best match: {best_match_name}, Distance: {best_match_distance:.4f}")

        if best_match_distance < self.threshold:
            return best_match_name, True
        else:
            return None, False