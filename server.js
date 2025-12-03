const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

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
Do not use bullet points, headings, or long explanations.
Keep it simple and casual.
`;


    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ suggestion: response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ suggestion: "AI generation failed" });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
