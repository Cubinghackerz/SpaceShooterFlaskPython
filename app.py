from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('scores.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.get_json()
    name = data.get('name', 'Anonymous')
    score = data.get('score', 0)

    conn = get_db_connection()
    conn.execute("INSERT INTO scores (name, score) VALUES (?, ?)", (name, score))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/highscores')
def highscores():
    conn = get_db_connection()
    scores = conn.execute("SELECT name, score FROM scores ORDER BY score DESC LIMIT 10").fetchall()
    conn.close()
    return jsonify([dict(row) for row in scores])

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
