from face_detector import FaceDetector
from db_handler import VoterDatabase


class AuthSync:
    
    def __init__(self):
        self.detector = FaceDetector()
        self.database = VoterDatabase()

    def clear_voters(self):
        self.database.clear_all_voters()
        return {"success": True, "message": "All voters cleared successfully!"}
     
    def register(self, name, image_path):
        encoding = self.detector.get_encoding(image_path)
        if encoding is None:
            return {"success": False, "message": "No face detected in image"}
        stored_voters = self.database.get_all_voters()
        matched_name, is_match = self.detector.match_face(encoding, stored_voters)
        if is_match:
            return {"success": False, "message": f"{matched_name} is already registered!"}
        self.database.save_voter(name, encoding)
        return {"success": True, "message": f"{name} registered successfully!"}

    def verify(self, image_path):
        encoding = self.detector.get_encoding(image_path)
        if encoding is None:
            return {"success": False, "message": "No face detected in image"}
        stored_voters = self.database.get_all_voters()
        matched_name, is_match = self.detector.match_face(encoding, stored_voters)
        if is_match:
            return {"success": False, "message": f"Access Denied - {matched_name} has already voted!"}
        return {"success": True, "message": "New voter - Access Granted!"}

    def get_all_voters(self):
        voters = self.database.get_all_voters()
        return {"total": len(voters), "voters": [{"name": v["name"]} for v in voters]}