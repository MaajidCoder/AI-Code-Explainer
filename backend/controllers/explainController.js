const { GoogleGenAI } = require('@google/genai');
const ExplanationHistory = require('../models/ExplanationHistory');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const explainCode = async (req, res) => {
    try {
        const { code, language } = req.body;
        
        if (!code || !language) {
            return res.status(400).json({ error: 'Code and language are required' });
        }

        const prompt = `Analyze the following ${language} code snippet and provide a detailed explanation.

Code:
\`\`\`${language}
${code}
\`\`\`

You must respond with ONLY a valid JSON object matching this exact schema, without any markdown formatting or code blocks around the JSON:
{
  "lineByLine": [
    { "line": "1-3", "explanation": "description of what these lines do" }
  ],
  "complexity": {
    "time": "O(...) with explanation",
    "space": "O(...) with explanation"
  },
  "edgeCases": [ "edge case 1", "edge case 2" ],
  "eli5": "Explain Like I'm 5 summary"
}`;

        // Call Gemini Model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        let rawText = response.text;
        rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        let explanationData;
        try {
            explanationData = JSON.parse(rawText);
        } catch (parseError) {
            console.error("Failed to parse Gemini response as JSON:", rawText);
            return res.status(500).json({ error: 'Failed to parse AI response' });
        }

        // Save to DB
        const newHistory = new ExplanationHistory({
            codeSnippet: code,
            language: language,
            explanation: explanationData
        });
        await newHistory.save();

        res.json(explanationData);

    } catch (error) {
        console.error('Error generating explanation:', error);
        res.status(500).json({ error: 'Failed to generate explanation' });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await ExplanationHistory.find().sort({ createdAt: -1 }).limit(20);
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

module.exports = {
    explainCode,
    getHistory
};
