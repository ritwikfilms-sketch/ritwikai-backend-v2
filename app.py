 import os
from flask import Flask, request, jsonify
from slack_sdk import WebClient
import google.generativeai as genai

app = Flask(_name_)

# Config
SLACK_TOKEN = os.environ.get("SLACK_BOT_TOKEN")
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")

slack_client = WebClient(token=SLACK_TOKEN)
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route("/", methods=["GET"])
def home():
    return "🔱 Ritwik AI-OS v2 is Online!", 200

@app.route("/slack/events", methods=["POST"])
def slack_events():
    data = request.json
    # Slack Verification
    if data and "challenge" in data:
        return data["challenge"], 200
    
    # AI Response Logic
    try:
        if "event" in data:
            event = data["event"]
            if event.get("type") == "app_mention" and "bot_id" not in event:
                channel_id = event["channel"]
                user_msg = event.get("text")
                
                response = model.generate_content(user_msg)
                slack_client.chat_postMessage(channel=channel_id, text=f"🔱 {response.text}")
    except Exception as e:
        print(f"Error: {e}")
                
    return "OK", 200

if _name_ == "_main_":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
