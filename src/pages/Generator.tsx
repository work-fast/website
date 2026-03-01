import React from 'react';
import { ArrowLeft, Sparkles, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Generator: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-6 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold mb-12 transition-colors uppercase tracking-widest text-xs"
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
                            <Sparkles size={16} className="text-slate-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">AI Resume Engine v1.0</span>
                        </div>
                        <h1 className="text-5xl md:text-5xl font-black tracking-tight text-slate-900 leading-[0.95]">
                            The Future of <br />
                            <span className="text-slate-300">Tailored Resumes.</span>
                        </h1>
                        <p className="text-lg font-medium text-slate-500 max-w-2xl">
                            Paste the job description below. Our AI will analyze the requirements and generate a perfectly tailored resume in seconds.
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#53a2be] to-[#1d84b5] rounded-[32px] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                        <div className="relative bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Job Description</label>
                            <textarea
                                placeholder="Paste the full job description here..."
                                className="w-full h-80 bg-slate-50 border-none rounded-2xl p-6 text-base font-medium text-slate-800 focus:ring-2 focus:ring-[#1d84b5] transition-all resize-none outline-none"
                            ></textarea>

                            <div className="mt-8 flex justify-end">
                                <button className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all shadow-2xl active:scale-95">
                                    Generate Resume <Send size={24} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                        {[
                            { title: 'ATS-Friendly', desc: 'Guaranteed compatibility.' },
                            { title: 'Smart-Keyword', desc: 'Hits every JD marker.' },
                            { title: 'Format-Ready', desc: 'PDF, DOCX, and more.' }
                        ].map((item) => (
                            <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-100">
                                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{item.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generator;
