import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { auth } from '../lib/auth';

type AuthMode = 'signIn' | 'signUp' | 'forgotPassword' | 'verifyEmail';

const Login: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'signIn') {
                await auth.signIn(email, password);
                navigate('/dashboard');
                window.location.reload();
            } else if (mode === 'signUp') {
                await auth.signUp(email, password);
                setMode('verifyEmail');
            } else if (mode === 'verifyEmail') {
                await auth.verifyOtp(email, otp);
                navigate('/dashboard');
                window.location.reload();
            } else if (mode === 'forgotPassword') {
                // Supabase forgot password would go here
                alert('If your email exists, a reset link has been sent to ' + email);
                setMode('signIn');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 md:p-12 relative overflow-hidden border border-slate-100">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1d84b510] rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10">
                    <div className="mb-10 text-center">
                        <div className="inline-flex p-4 bg-slate-50 rounded-2xl mb-6">
                            <Sparkles className="text-[#1d84b5]" size={32} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
                            {mode === 'signIn' ? 'Welcome Back.' :
                                mode === 'signUp' ? 'Create Account.' :
                                    mode === 'verifyEmail' ? 'Verify Email.' : 'Reset Password.'}
                        </h1>
                        <p className="text-slate-400 font-medium">
                            {mode === 'signIn' ? 'Continue your career growth' :
                                mode === 'signUp' ? 'Join the elite job seekers' :
                                    mode === 'verifyEmail' ? 'Enter the code sent to your email' : 'Enter your email to recover access'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === 'signUp' && (
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-[#1d84b5] transition-all outline-none font-medium"
                                    />
                                </div>
                            </div>
                        )}

                        {mode === 'verifyEmail' ? (
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Verification Code</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="123456"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-[#1d84b5] transition-all outline-none font-medium text-center tracking-[0.5em] text-xl"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold mt-2 text-center">
                                    Sent to <span className="text-slate-600">{email}</span>
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-[#1d84b5] transition-all outline-none font-medium"
                                        />
                                    </div>
                                </div>

                                {mode !== 'forgotPassword' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</label>
                                            {mode === 'signIn' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setMode('forgotPassword')}
                                                    className="text-[10px] font-black uppercase tracking-widest text-[#1d84b5] hover:underline"
                                                >
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-[#1d84b5] transition-all outline-none font-medium"
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {mode === 'signIn' ? 'Sign In' :
                                        mode === 'signUp' ? 'Create Account' :
                                            mode === 'verifyEmail' ? 'Verify Code' : 'Send Link'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-4">
                        {mode === 'signIn' ? (
                            <p className="text-center text-sm font-bold text-slate-400">
                                New to Work-Fast? {' '}
                                <button onClick={() => setMode('signUp')} className="text-[#1d84b5] font-black uppercase tracking-widest text-xs ml-1 hover:underline">Sign Up</button>
                            </p>
                        ) : (
                            <p className="text-center text-sm font-bold text-slate-400">
                                Already have an account? {' '}
                                <button onClick={() => setMode('signIn')} className="text-[#1d84b5] font-black uppercase tracking-widest text-xs ml-1 hover:underline">Sign In</button>
                            </p>
                        )}

                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 justify-center mt-4">
                            <ShieldCheck size={14} />
                            <span>Secure Authentication</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
