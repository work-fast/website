import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TOKEN_KEY = 'workfast_token';
const USER_KEY = 'workfast_user';

export interface User {
    id?: string;
    email: string;
    name?: string;
    resumesLeft?: number;
    skillScore?: number;
    profileData?: any;
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
                id: data.user?.id,
                email: data.user?.email,
                name: data.user?.email?.split('@')[0]
            }));
            await auth.fetchUserProfile();
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
            const userBasic = {
                id: data.user?.id,
                email: data.user?.email,
                name: data.user?.email?.split('@')[0]
            };
            localStorage.setItem(USER_KEY, JSON.stringify(userBasic));

            // Try to fetch profile from DB
            await auth.fetchUserProfile();
        }
        return data;
    },

    fetchUserProfile: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error("Error fetching profile:", error);
            return null;
        }

        if (data) {
            // Merge with local storage
            auth.updateUser({
                resumesLeft: data.resumes_left,
                skillScore: data.skill_score,
                profileData: data.profile_data,
                name: data.name || data.email?.split('@')[0]
            });
        }
        return data;
    },

    updateUserProfile: async (updates: Partial<User>) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error("Not authenticated");

        const dbUpdates = {
            id: session.user.id,
            email: session.user.email,
            ...(updates.name !== undefined && { name: updates.name }),
            ...(updates.resumesLeft !== undefined && { resumes_left: updates.resumesLeft }),
            ...(updates.skillScore !== undefined && { skill_score: updates.skillScore }),
            ...(updates.profileData !== undefined && { profile_data: updates.profileData })
        };

        const { error } = await supabase
            .from('profiles')
            .upsert(dbUpdates, { onConflict: 'id' });

        if (error) throw error;

        // Also update local cache
        auth.updateUser(updates);
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

    updateUser: (updates: Partial<User>) => {
        const currentUser = auth.getUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        }
        return null;
    },

    isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY)
};
