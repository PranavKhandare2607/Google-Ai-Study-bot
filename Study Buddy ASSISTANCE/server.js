import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AIzaSyAUI8hqd5Os2FYibzEcnucvZ_zuy3V7BBE";

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    res.json({ reply: "Error occurred 😅" });
  }
});

app.get("/", (req, res) => {
  res.send("Study Buddy Backend Running 🚀");
});

app.listen(3000, () => console.log("Server running"));