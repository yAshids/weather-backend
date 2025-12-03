const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// your API key
const genAI = new GoogleGenerativeAI("AIzaSyCkjctRpMM6HvMI7SAxkVwym2_L99c3Tto");

app.post("/outfit", async (req, res) => {
  try {
    const { temp, desc } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const prompt = `
Weather: ${temp}°C, ${desc}.
Give a short outfit recommendation in 3–4 lines only.
Do not use bullet points or long paragraphs.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ suggestion: response.text() });

  } catch (error) {
    console.error(error);
    res.status(500).json({ suggestion: "AI generation failed" });
  }
});

// IMPORTANT: Render uses process.env.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend running on port " + PORT));
