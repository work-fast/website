"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            await supabase.auth.admin.signOut(token); // Or just relying on client-side logout
        }
        res.json({ message: 'Logged out successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/forgetpassword', async (req, res) => {
    try {
        const { email } = req.body;
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
