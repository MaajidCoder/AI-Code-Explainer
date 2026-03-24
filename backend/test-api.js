const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testKey() {
    try {
        console.log("Testing API Key...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Say "Working!" if you receive this.',
        });
        console.log("SUCCESS! API Key is working.");
        console.log("Response:", response.text);
    } catch (error) {
        console.log("FAILED to generate content.");
        console.log("Error Status:", error.status);
        console.log("Error Details:", error.message);
    }
}

testKey();
