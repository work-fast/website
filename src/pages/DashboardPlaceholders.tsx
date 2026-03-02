import React, { useEffect, useState } from 'react';
import { Mail, Construction, History as HistoryIcon, Download, FileText, CalendarDays } from 'lucide-react';
import { auth, type User } from '../lib/auth';

const PlaceholderPage: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-300">
            {icon}
        </div>
        <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tight">
                {title}<span className="text-[#1d84b5]">.</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white shadow-xl">
                <Construction size={14} className="text-[#1d84b5]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Under Construction</span>
            </div>
            <p className="text-slate-400 font-medium max-w-md mx-auto">
                We're currently building this feature to give you the most powerful career accelerator tools on the market. Stay tuned.
            </p>
        </div>
    </div>
);

export const History: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(auth.getUser());
    }, []);

    const historyItems = user?.profileData?.history || [];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3">
                <HistoryIcon className="text-[#1d84b5]" size={32} />
                <h1 className="text-4xl font-black tracking-tight text-slate-900">History</h1>
            </div>

            {historyItems.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
                    <p className="text-slate-500 font-medium">You haven't generated any resumes yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {historyItems.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-[#1d84b5]/30 hover:shadow-md transition-all group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#1d84b5]/10 transition-colors">
                                    <FileText className="text-slate-400 group-hover:text-[#1d84b5] transition-colors" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <CalendarDays size={14} />
                                        {new Date(item.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#1d84b5] bg-slate-50 hover:bg-slate-100 px-6 py-3 rounded-xl transition-all"
                            >
                                View PDF <Download size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Contact: React.FC = () => <PlaceholderPage title="Contact Support" icon={<Mail size={48} />} />;
