import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TOKEN_KEY = 'workfast_token';
const USER_KEY = 'workfast_user';

export interface User {
    email: string;
    name?: string;
}

export const auth = {
    // Sign up with email and password
    signUp: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    // Verify the OTP code sent to email
    verifyOtp: async (email: string, token: string) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup',
        });
        if (error) throw error;

        if (data.session) {
            localStorage.setItem(TOKEN_KEY, data.session.access_token);
            localStorage.setItem(USER_KEY, JSON.stringify({
                email: data.user?.email,
                name: data.user?.email?.split('@')[0]
            }));
        }
        return data;
    },

    // Sign in with email and password
    signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;

        if (data.session) {
            localStorage.setItem(TOKEN_KEY, data.session.access_token);
            localStorage.setItem(USER_KEY, JSON.stringify({
                email: data.user?.email,
                name: data.user?.email?.split('@')[0]
            }));
        }
        return data;
    },

    logout: async () => {
        await supabase.auth.signOut();
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getToken: () => localStorage.getItem(TOKEN_KEY),

    getUser: (): User | null => {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY)
};
