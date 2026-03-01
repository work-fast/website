import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

const TestimonialInfographic: React.FC = () => {
    // User provided colors: ffffff, 53a2be, 1d84b5, 132e32, 176087
    const colors = {
        white: '#ffffff',
        lightBlue: '#53a2be',
        mediumBlue: '#1d84b5',
        deepTeal: '#132e32',
        darkBlue: '#176087'
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-8 font-sans">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row">

                {/* Decorative Background Elements - Subtle hints of the palette */}
                <div className="absolute top-[-10%] right-[-10%] h-80 w-80 rounded-full blur-[100px] opacity-10" style={{ backgroundColor: colors.lightBlue }} />
                <div className="absolute bottom-[-10%] left-[-10%] h-80 w-80 rounded-full blur-[100px] opacity-5" style={{ backgroundColor: colors.mediumBlue }} />

                {/* Left Side: User & Review */}
                <div className="relative flex-1 p-12 md:p-16 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center bg-slate-50/30">
                    <div className="relative mb-8 w-40 h-40">
                        {/* Profile Frame with Palette Gradient */}
                        <div className={`absolute inset-0 rounded-3xl p-[3px] shadow-lg`}
                            style={{ background: `linear-gradient(135deg, ${colors.darkBlue}, ${colors.lightBlue}, ${colors.mediumBlue})` }}>
                            <div className="h-full w-full rounded-[21px] bg-white overflow-hidden relative">
                                <img
                                    src="/satisfied_user.png"
                                    alt="Satisfied User"
                                    className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sarah Jenkins</h3>
                        <div className="flex gap-1 mt-2" style={{ color: colors.mediumBlue }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                    </div>

                    <blockquote className="text-2xl md:text-3xl font-bold leading-tight text-slate-700 italic">
                        "Work-Fast is a complete game-changer! It's an all-in-one platform where you can generate a resume tailored to any job description and simultaneously prepare for interviews. It streamlines the entire process, and the <span className="font-extrabold" style={{ color: colors.darkBlue }}>price is unbeatable</span>."
                    </blockquote>
                </div>

                {/* Right Side: Product Details & Pricing */}
                <div className="flex-1 p-12 md:p-16 bg-white flex flex-col justify-between">

                    <div className="space-y-12">
                        {/* Logo area - Just the logo icon (Max Prominence) */}
                        <div className="flex items-center">
                            <div className="relative overflow-hidden w-64 h-28 flex items-center justify-center p-3 bg-slate-50/50 rounded-[32px] border border-slate-100/50 shadow-md backdrop-blur-sm">
                                <img
                                    src="/logo.png"
                                    alt="Work-Fast"
                                    className="h-full w-auto object-contain scale-110"
                                />
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 shadow-sm border border-slate-100 group-hover:bg-slate-50"
                                    style={{ color: colors.mediumBlue }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Generate Resumes from JD</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 shadow-sm border border-slate-100 group-hover:bg-slate-50"
                                    style={{ color: colors.darkBlue }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Prepare for Interviews</span>
                            </div>
                        </div>

                        {/* Pricing Tiers - Optimized for Light theme */}
                        <div className="grid gap-4 mt-8">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:border-slate-300">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">FREE PLAN</span>
                                    <span className="text-xl font-black text-slate-800">Free</span>
                                </div>
                                <p className="text-slate-500 font-medium">Generate 5 resumes/month!</p>
                            </div>

                            {/* Highlighted Plan */}
                            <div className="relative p-6 rounded-2xl border-2 transition-all duration-300 shadow-xl"
                                style={{ borderColor: colors.mediumBlue, backgroundColor: `${colors.mediumBlue}05` }}>
                                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase" style={{ backgroundColor: colors.mediumBlue }}>MOST POPULAR</div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-black uppercase tracking-widest" style={{ color: colors.darkBlue }}>PRO MONTHLY</span>
                                    <span className="text-xl font-black text-slate-900">$5<span className="text-sm font-medium text-slate-400">/mo</span></span>
                                </div>
                                <p className="text-slate-600 font-bold">300 resumes/month!</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:border-slate-300">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 text-opacity-80" style={{ color: colors.darkBlue }}>YEARLY PLAN</span>
                                    <span className="text-xl font-black text-slate-800">$50<span className="text-sm font-medium text-slate-400">/yr</span></span>
                                </div>
                                <p className="text-slate-500 font-medium">300 resumes/month value!</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between text-slate-300 text-[10px] font-black tracking-widest uppercase">
                        <span>Enterprise GRADE SECURITY</span>
                        <span>NO CREDIT CARD REQUIRED</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialInfographic;
