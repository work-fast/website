import { Router } from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const router = Router();
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

// Auth Middleware
const withAuth = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Unauthorized: Invalid token' });

    req.user = user;
    next();
};

router.post('/generate', withAuth, async (req: any, res: any) => {
    try {
        const { techLabel, roleLabel } = req.body;

        if (!techLabel || !roleLabel) {
            return res.status(400).json({ error: "techLabel and roleLabel are required." });
        }

        const prompt = `You are an expert technical interviewer. Generate exactly 15 multiple-choice questions for a ${roleLabel} focusing on ${techLabel}. 
        Return ONLY a raw, valid JSON array of objects. Do not use markdown blocks, do not include any other text.
        Each object MUST have this exact structure:
        {
            "id": number (1-15),
            "question": "The text of the question",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": number (0-3, corresponding to the correct option index),
            "explanation": "A brief explanation of why the answer is correct."
        }`;

        const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${deepseekApiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "You are a specialized technical interview question generator that outputs only raw JSON arrays." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`DeepSeek API Error: ${errorText}`);
        }

        const aiData = await response.json();
        const messageContent = aiData.choices[0].message.content.trim();

        // Try to parse the content directly or extract json
        let jsonString = messageContent;
        if (jsonString.startsWith('\`\`\`json')) {
            jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        } else if (jsonString.startsWith('\`\`\`')) {
            jsonString = jsonString.replace(/\`\`\`/g, '').trim();
        }

        const parsedQuestions = JSON.parse(jsonString);
        res.json({ questions: parsedQuestions });

    } catch (err: any) {
        console.error("Express Interview Gen Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

export default router;
