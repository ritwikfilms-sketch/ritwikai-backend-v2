import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-script", async (req, res) => {
  const { topic } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a viral short video script writer." },
        { role: "user", content: ⁠ Create a short viral reel script for topic: ${topic}. Format: Hook, Main, CTA, Caption, Hashtags. ⁠ }
      ],
    });

    res.json({ script: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
