from flask import Flask, request, jsonify
import cx_Oracle

app = Flask(__name__)
dsn = cx_Oracle.makedsn("localhost", 1521, service_name="xe")  
conn = cx_Oracle.connect(user="your_username", password="your_password", dsn=dsn)

@app.route("/submit_contact", methods=["POST"])
def submit_contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contact_messages (name, email, message) VALUES (:1, :2, :3)",
        (name, email, message)
    )
    conn.commit()
    cursor.close()

    return jsonify({"status": "success", "message": "Message stored successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
