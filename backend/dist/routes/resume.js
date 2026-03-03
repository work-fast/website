"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
dotenv_1.default.config();
const router = (0, express_1.Router)();
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
// Auth Middleware to ensure only logged-in users use credits
const withAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user)
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    req.user = user;
    next();
};
router.post('/generate', withAuth, async (req, res) => {
    try {
        const { jobDescription, profileData } = req.body;
        if (!jobDescription || !profileData) {
            return res.status(400).json({ error: "jobDescription and profileData are required." });
        }
        const prompt = `You are an expert ATS resume writer. I will provide you with a user's JSON profile data and a job description. 
Your task is to generate a highly tailored, professional, ATS-friendly resume in pure HTML format.

USER PROFILE JSON:
${JSON.stringify(profileData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Generate ONLY the HTML code for the resume. The HTML should be self-contained with inline CSS styling. Use a clean, modern, single-column or classic two-column layout that is highly readable. Use standard professional fonts (e.g., Arial, Helvetica, sans-serif or Garamond, Times New Roman, serif). Make sure it includes sections for Contact, Summary, Experience, Education, and Skills tailored specifically to hit keywords in the job description. DO NOT use markdown code block backticks like \`\`\`html in your response. Return ONLY the raw HTML string start to finish.`;
        const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': anthropicApiKey || '',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [{ role: 'user', content: prompt }]
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Anthropic API Error: ${errorText}`);
        }
        const aiData = await response.json();
        const rawHtml = aiData.content[0].text;
        // Clean markdown backticks if AI accidentally includes them
        const cleanHtml = rawHtml.replace(/^```html\n?/, '').replace(/```$/, '').trim();
        res.json({ html: cleanHtml });
    }
    catch (err) {
        console.error("Express Resume Gen Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
