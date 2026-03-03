import React from 'react';
import { Sparkles, ArrowUpRight, Zap, Target, BookOpen } from 'lucide-react';
import { auth } from '../lib/auth';

const Dashboard: React.FC = () => {
    const user = auth.getUser();
    const resumesLeft = user?.resumesLeft ?? 5; // Default to 5 for now
    const skillScoreDisplay = user?.skillScore !== undefined ? `${user.skillScore}%` : 'N/A';

    const stats = [
        { label: 'Resumes Left', value: resumesLeft, icon: <Sparkles className="text-[#1d84b5]" />, color: 'bg-blue-50' },
        { label: 'Applications', value: 12, icon: <Target className="text-slate-900" />, color: 'bg-slate-50' },
        { label: 'Interview Score', value: skillScoreDisplay, icon: <Zap className="text-amber-500" />, color: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">
                        Overview<span className="text-[#1d84b5]">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Welcome back, {user?.name || 'Ambassador'}
                    </p>
                </div>
                <div className="px-6 py-3 rounded-full bg-slate-100 border border-slate-200">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Free Tier Active</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                        <h2 className="text-4xl font-black text-slate-900">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-3xl font-black leading-tight">Need more <br />resumes?</h3>
                        <p className="text-slate-400 font-medium max-w-xs">Upgrade to Pro and get unlimited tailored resumes, interview prep, and priority support.</p>
                        <button className="bg-[#1d84b5] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#156a91] transition-all flex items-center gap-2 shadow-2xl">
                            Go Pro Now <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#1d84b5] opacity-10 rounded-full -mr-20 -mb-20 blur-3xl"></div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 p-10 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="text-slate-200" size={32} />
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Activity</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                { action: 'Resume Generated', target: 'Senior Product Designer', time: '2 hours ago' },
                                { action: 'Interview Practice', target: 'Technical Round', time: 'Yesterday' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.action}</p>
                                        <p className="text-xs font-bold text-slate-400">{item.target}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
