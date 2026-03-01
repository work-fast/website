import React from 'react';
import { Mail, Construction, History as HistoryIcon } from 'lucide-react';

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

export const History: React.FC = () => <PlaceholderPage title="History" icon={<HistoryIcon size={48} />} />;
export const Contact: React.FC = () => <PlaceholderPage title="Contact Support" icon={<Mail size={48} />} />;
