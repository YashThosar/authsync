import sqlite3
import json
import os


class VoterDatabase:
    def __init__(self, db_path="database/voters.db"):
        self.db_path = db_path
        self.init_db()

    def init_db(self):
        os.makedirs("database", exist_ok=True)
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS voters (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    encoding TEXT NOT NULL,
                    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
        print("Database initialized successfully!")

    def save_voter(self, name, encoding):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            encoding_str = json.dumps(encoding)
            cursor.execute(
                "INSERT INTO voters (name, encoding) VALUES (?, ?)",
                (name, encoding_str)
            )
            conn.commit()
        print(f"Voter '{name}' saved to database!")

    def get_all_voters(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT name, encoding FROM voters")
            rows = cursor.fetchall()
        voters = []
        for name, encoding_str in rows:
            encoding = json.loads(encoding_str)
            voters.append({"name": name, "encoding": encoding})
        return voters

    def clear_all_voters(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM voters")
            conn.commit()
        print("All voters cleared from database!")