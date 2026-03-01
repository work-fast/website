import React from 'react';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import TestimonialInfographic from '../components/TestimonialInfographic';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const colors = {
        lightBlue: '#53a2be',
        mediumBlue: '#1d84b5',
        deepTeal: '#132e32',
        darkBlue: '#176087'
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Hero Section */}
            <main className="relative overflow-hidden pt-20 pb-32">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
                            <Sparkles size={16} className="text-slate-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Revolutionizing Job Applications</span>
                        </div>

                        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:text-7xl leading-[0.95]">
                            Land Your Dream Job <br />
                            <span className="text-slate-300">With Work-Fast.</span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-slate-500 leading-relaxed md:text-xl">
                            The all-in-one platform to <span className="text-slate-900 font-bold">generate tailored resumes</span> for any JD and <span className="text-slate-900 font-bold">master your interviews</span> with AI-powered prep.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
                            <button
                                onClick={() => navigate('/generator')}
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-10 py-5 text-xl font-black text-white shadow-2xl transition-all hover:bg-slate-700"
                            >
                                Get Started Free <ArrowRight className="ml-2" />
                            </button>
                            <button className="rounded-2xl border-2 border-slate-200 bg-white px-10 py-5 text-xl font-black text-slate-900 transition-all hover:border-slate-400">
                                See How It Works
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-slate-100/50 rounded-full blur-[120px] -z-10"></div>
            </main>

            {/* Core Features */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        <div className="space-y-8">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${colors.mediumBlue}15`, color: colors.mediumBlue }}>
                                <Target size={32} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight">Precision Resume Generation</h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Upload any job description and let our AI craft a resume that hits every keyword, highlights your most relevant experience, and beats the ATS every time.
                            </p>
                            <ul className="space-y-4">
                                {['ATS-Optimized Formatting', 'Context-Aware Skills Mapping', 'Multiple Export Formats'].map((feat) => (
                                    <li key={feat} className="flex items-center gap-3 font-bold text-slate-700">
                                        <ArrowRight size={20} style={{ color: colors.mediumBlue }} />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${colors.darkBlue}15`, color: colors.darkBlue }}>
                                <Zap size={32} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight">AI-Powered Interview Prep</h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Prepare for the exact role you're applying for. Our AI generates likely interview questions based on the JD and your resume, providing real-time feedback.
                            </p>
                            <ul className="space-y-4">
                                {['Role-Specific Mock Interviews', 'Real-time Answer Feedback', 'Body Language Analysis'].map((feat) => (
                                    <li key={feat} className="flex items-center gap-3 font-bold text-slate-700">
                                        <ArrowRight size={20} style={{ color: colors.darkBlue }} />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center mb-16">
                    <h2 className="text-4xl font-black tracking-tight mb-4">Trusted by Job Seekers</h2>
                    <p className="text-lg text-slate-500 font-medium">Join thousands of professionals landing roles at top-tier companies.</p>
                </div>
                <TestimonialInfographic />
            </section>
        </div>
    );
};

export default Home;
