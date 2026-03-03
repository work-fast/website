const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    },

    // Verify the OTP code sent to email
    verifyOtp: async (email: string, token: string) => {
        const response = await fetch(`${API_BASE}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

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
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

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
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;

        const response = await fetch(`${API_BASE}/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error("Error fetching profile");
            return null;
        }

        const data = await response.json();
        if (Object.keys(data).length > 0) {
            auth.updateUser({
                resumesLeft: data.resumes_left ?? 5,
                skillScore: data.skill_score,
                profileData: data.profile_data,
                name: data.name || data.email?.split('@')[0]
            });
        }
        return data;
    },

    updateUserProfile: async (updates: Partial<User>) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) throw new Error("Not authenticated");

        const response = await fetch(`${API_BASE}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        // Also update local cache
        auth.updateUser(updates);
    },

    updateScore: async (score: number) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) throw new Error("Not authenticated");

        const response = await fetch(`${API_BASE}/profile/score`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ skillScore: score })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        auth.updateUser({ skillScore: score });
    },

    logout: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch(() => { });
        }
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getToken: () => localStorage.getItem(TOKEN_KEY),

    getUser: (): User | null => {
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) return null;
        const user = JSON.parse(userStr);
        if (user.resumesLeft === undefined || user.resumesLeft === null) {
            user.resumesLeft = 5;
        }
        return user;
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
