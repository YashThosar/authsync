from auth_sync import AuthSync

if __name__ == "__main__":
    auth = AuthSync()

    # Test detect
    auth.detector.detect_face("test_face.jpg")

    # Test verify
    result = auth.verify("test_face.jpg")
    print(result)