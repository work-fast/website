import fetch from 'node-fetch';

const prompt = `You are an expert technical interviewer. Generate exactly 50 multiple-choice questions for a Intern / Student focusing on Python. 
Return ONLY a raw, valid JSON array of objects. Do not use markdown blocks, do not include any other text.
Each object MUST have this exact structure:
{
    "id": number (1-50),
    "question": "The text of the question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": number (0-3, corresponding to the correct option index),
    "explanation": "A brief explanation of why the answer is correct."
}`;

async function test() {
    console.log("Sending request...");
    const start = Date.now();
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-4241f1b27868414d8dd0155442809c53`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "You are a specialized technical interview question generator that outputs only raw JSON arrays." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 8000
            })
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Time taken:", (Date.now() - start) / 1000, "seconds");

        if (!response.ok) {
            console.error("Error data:", data);
            return;
        }

        const messageContent = data.choices[0].message.content.trim();
        console.log("Response starts with:", messageContent.substring(0, 100));
        console.log("Response ends with:", messageContent.substring(messageContent.length - 100));
        console.log("Finish reason:", data.choices[0].finish_reason);

        // Try parsing
        let jsonString = messageContent;
        if (jsonString.startsWith('\`\`\`json')) {
            jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        } else if (jsonString.startsWith('\`\`\`')) {
            jsonString = jsonString.replace(/\`\`\`/g, '').trim();
        }

        try {
            const parsed = JSON.parse(jsonString);
            console.log("Successfully parsed JSON array. Length:", parsed.length);
        } catch (e) {
            console.error("JSON parse failed:", e.message);
        }
    } catch (e) {
        console.error("Network/Fetch error:", e.message);
    }
}

test();
