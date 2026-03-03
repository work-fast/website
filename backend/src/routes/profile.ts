import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
// Note: We use the SERVICE_ROLE_KEY here to bypass RLS securely on the backend, 
// OR we can use ANON_KEY but pass the user's JWT standardly. For API endpoints, we 
// should extract the Bearer token and pass it to Supabase to act on behalf of the user.
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

// Middleware to set user auth token for Supabase client per request
const withAuth = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Unauthorized: Invalid token' });

    req.user = user;
    next();
};

router.get('/', withAuth, async (req: any, res: any) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', req.user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            return res.status(400).json({ error: error.message });
        }
        res.json(data || {});
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/', withAuth, async (req: any, res: any) => {
    try {
        const updates = req.body;

        const dbUpdates = {
            id: req.user.id,
            email: req.user.email,
            ...(updates.name !== undefined && { name: updates.name }),
            ...(updates.resumesLeft !== undefined && { resumes_left: updates.resumesLeft }),
            ...(updates.skillScore !== undefined && { skill_score: updates.skillScore }),
            ...(updates.profileData !== undefined && { profile_data: updates.profileData })
        };

        const { data, error } = await supabase
            .from('profiles')
            .upsert(dbUpdates, { onConflict: 'id' })
            .select()
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/score', withAuth, async (req: any, res: any) => {
    try {
        const { skillScore } = req.body;
        const { data, error } = await supabase
            .from('profiles')
            .update({ skill_score: skillScore })
            .eq('id', req.user.id)
            .select()
            .single();

        if (error) return res.status(400).json({ error: error.message });
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
