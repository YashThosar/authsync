# AuthSync — Face Recognition Authentication System

A full-stack biometric authentication system that uses facial recognition to verify identities and prevent duplicate access. Built for use cases like voting booths, exam halls, office entry, and event ticketing.

---



## Features

- **Face Registration** — Register a person by capturing their face encoding
- **Face Verification** — Verify identity in real-time using facial recognition
- **Duplicate Prevention** — Automatically denies access if the same face is detected again
- **Election Reset** — Clear all registered voters to start a fresh cycle
- **Admin Dashboard** — Real-time stats, quick actions, and system status
- **Dark Mode** — Full light/dark theme toggle
- **REST API** — Clean FastAPI backend with auto-generated Swagger documentation

---

## Tech Stack

**Backend**
- Python
- FastAPI
- DeepFace (FaceNet model — 128-dim face embeddings)
- OpenCV
- SQLite
- TensorFlow

**Frontend**
- React
- React Router
- Axios
- CSS Variables (light/dark theming)

---

## Architecture
---

## Project Structure

authsync/
├── backend/
│   ├── auth_sync.py        # Core authentication logic
│   ├── face_detector.py    # Face detection and encoding (OpenCV + DeepFace)
│   ├── db_handler.py       # Database operations (SQLite)
│   ├── api.py              # FastAPI REST API
│   ├── main.py             # Local testing entry point
│   ├── database/           # SQLite database
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── Dashboard.js    # Stats, quick actions, election reset
│   │   ├── Register.js     # Voter registration page
│   │   ├── Verify.js       # Face verification page
│   │   ├── Voters.js       # All registered voters
│   │   ├── Navbar.js       # Navigation with theme toggle
│   │   ├── ThemeContext.js # Dark/light mode context
│   │   └── index.css       # Design system with CSS variables
│   └── package.json
│
└── README.md

---

## How It Works

1. **Registration** — User uploads a photo. DeepFace generates a 128-dimensional face embedding using the FaceNet model. This encoding is stored in SQLite.

2. **Verification** — User uploads a photo. A new encoding is generated and compared against all stored encodings using Euclidean distance. If the distance is below 0.6, the face is considered a match and access is denied.

3. **Reset** — Admin can clear all voter encodings to start a new election cycle.

---

## Getting Started

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/YashThosar/authsync
cd authsync/backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn api:app --reload
```

API runs at `http://localhost:8000`
Swagger docs at `http://localhost:8000/docs`

### Frontend Setup

```bash
cd authsync/frontend

# Install dependencies
npm install

# Start React app
npm start
```

Frontend runs at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/register` | Register a new voter with name + image |
| POST | `/verify` | Verify if a face has already voted |
| GET | `/voters` | Get all registered voters |
| DELETE | `/clear-voters` | Clear all voters for new election cycle |

---

## Note on First Run

DeepFace will automatically download the FaceNet model (~90MB) on first run. This only happens once and is saved to `~/.deepface/weights`.

---

## Common Setup Issues

**venv activation fails on Windows**
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Camera not working**
The system supports static image uploads for environments without a webcam.

---

## Roadmap

- [x] Phase 1 — Face detection, encoding, and matching
- [x] Phase 2 — FastAPI backend with OOP architecture
- [x] Phase 3 — React frontend with dark mode and dashboard
- [ ] Phase 4 — PostgreSQL migration
- [ ] Phase 5 — Deployment on Railway/Render
- [ ] Phase 6 — Liveness detection (anti-spoofing)
- [ ] Phase 7 — OTP verification layer

---

## Developer

**Yash Thosar**
Third Year IT Student — SPPU
[GitHub](https://github.com/YashThosar)
