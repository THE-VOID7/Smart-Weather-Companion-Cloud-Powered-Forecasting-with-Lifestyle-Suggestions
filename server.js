import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // load .env file

const app = express();
app.use(bodyParser.json());

const API_KEY = process.env.CHATBOT_API_KEY; // store your API key in .env

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: userMessage,
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.output[0].content[0].text
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "⚠️ Error contacting chatbot API." });
  }
});

app.listen(3000, () => console.log("✅ Chatbot backend running on http://localhost:3000"));
