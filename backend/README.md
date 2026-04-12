# Project Elect - Smart Voting System

A software-based voter verification system using face recognition to prevent duplicate voting.

## Tech Stack
- Python
- OpenCV
- DeepFace (FaceNet model)
- SQLite

## Project Structure
```
voting-system/
├── database/          # SQLite database lives here
├── encodings/         # Face encodings storage
├── utils/             # Helper functions
├── main.py            # Entry point - run this
├── face_detector.py   # Face detection and encoding logic
├── db_handler.py      # Database operations
└── requirements.txt   # All libraries
```

## Setup Instructions

### Step 1 - Clone the repo
```bash
git clone https://github.com/nikhilwendole/project-elect
cd project-elect
```

### Step 2 - Create virtual environment
```bash
python -m venv venv
```

Activate it:
```bash
# Windows
.\venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### Step 3 - Install libraries
```bash
pip install -r requirements.txt
```

### Step 4 - Add a test image
Place a clear front facing photo named `test_face.jpg` in the root folder.

### Step 5 - Run the project
```bash
python main.py
```

## Note on First Run
DeepFace will download the FaceNet model (~90MB) on first run automatically.
This only happens once. Just let it complete.

## Current Progress
- [x] Phase 1 - Project Setup
- [x] Phase 1 - Face Detection using OpenCV Haar Cascade
- [x] Phase 1 - Face Encoding using DeepFace FaceNet
- [ ] Phase 1 - Database integration
- [ ] Phase 1 - Face matching logic
- [ ] Phase 2 - Camera integration

## Common Errors

**venv activation fails on Windows:**
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then try activating again.

**dlib/face_recognition installation fails:**
We use DeepFace instead, no dlib needed.

**Camera not working:**
Change `cv2.VideoCapture(0)` to `cv2.VideoCapture(1)` or use a static image for testing.

## Developers
- Yash
- Nikhil

## Dependencies

Core libraries needed:
- `deepface==0.0.98` — face recognition and encoding
- `opencv-python==4.13.0.92` — camera and image processing
- `numpy==2.4.2` — numerical operations
- `tensorflow==2.20.0` — required by DeepFace under the hood
- `cmake==4.2.1` — required for building some dependencies

Everything else installs automatically when you run:
```bash
pip install deepface opencv-python numpy
```