import React from 'react';
import {
    Cpu,
    Globe,
    ShieldCheck,
    Layers,
    Zap,
    BarChart3,
    Users,
    Smartphone,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';

const SectionLayout: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <section className={`py-24 px-6 sm:px-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
    </section>
);

export const Platform = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <SectionLayout className="bg-slate-50 pt-32">
                <div className="max-w-4xl">
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
                        The Engine <br />
                        <span className="text-slate-300">Of Your Career.</span>
                    </h1>
                    <p className="text-xl md:text-xl font-medium text-slate-500 max-w-2xl leading-relaxed">
                        Work-Fast isn't just a tool; it's a comprehensive career ecosystem powered by proprietary AI architectures.
                    </p>
                </div>
            </SectionLayout>

            {/* 2. Core Architecture */}
            <SectionLayout>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <Cpu size={48} className="text-[#1d84b5]" />
                        <h3 className="text-2xl font-black">Neural JD Analysis</h3>
                        <p className="text-slate-500 font-medium">Our engine deconstructs job descriptions into core semantic markers, ensuring your resume speaks the language of recruiters and ATS. </p>
                    </div>
                    <div className="space-y-6">
                        <Globe size={48} className="text-[#1d84b5]" />
                        <h3 className="text-2xl font-black">Global Reach</h3>
                        <p className="text-slate-500 font-medium">Adapted for global markets, understanding regional variations in resume standards from Silicon Valley to Singapore.</p>
                    </div>
                    <div className="space-y-6">
                        <ShieldCheck size={48} className="text-[#1d84b5]" />
                        <h3 className="text-2xl font-black">Privacy First</h3>
                        <p className="text-slate-500 font-medium">Your data is encrypted end-to-end. We process information to help you get hired, never to sell your profile.</p>
                    </div>
                </div>
            </SectionLayout>

            {/* 3. Deep Integration */}
            <SectionLayout className="bg-slate-900 text-white rounded-[60px] mx-4 my-12">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black leading-tight">Connected <br />Career Intelligence.</h2>
                        <p className="text-lg text-slate-400 font-medium">Our platform bridges the gap between your past experience and your future potential by identifying skill overlaps you didn't even know existed.</p>
                        <div className="flex flex-wrap gap-4">
                            {['LinkedIn Sync', 'Github Import', 'Portfolio Analysis'].map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-full border border-slate-700 text-xs font-black uppercase tracking-widest">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-8 rounded-3xl space-y-4">
                            <Layers className="text-[#53a2be]" />
                            <h4 className="font-black uppercase tracking-tight">Smart Layering</h4>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-3xl space-y-4 mt-8">
                            <Zap className="text-[#53a2be]" />
                            <h4 className="font-black uppercase tracking-tight">Instant Sync</h4>
                        </div>
                    </div>
                </div>
            </SectionLayout>

            {/* 4. Infrastructure Stats */}
            <SectionLayout>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { val: '98%', label: 'ATS Pass Rate' },
                        { val: '1.2s', label: 'Gen Speed' },
                        { val: '250+', label: 'Role Types' },
                        { val: '1M+', label: 'Resumes Gen' }
                    ].map(stat => (
                        <div key={stat.label}>
                            <div className="text-4xl font-black text-slate-900 mb-2">{stat.val}</div>
                            <div className="text-xs font-black uppercase tracking-widest text-[#1d84b5]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </SectionLayout>

            {/* 5. Scalability */}
            <SectionLayout className="bg-slate-50 border-y border-slate-100">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <BarChart3 size={64} className="text-slate-200 mb-8" />
                        <h2 className="text-3xl font-black tracking-tight mb-6">Built for Success at Scale.</h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">Whether you're a student or a senior executive, the Work-Fast platform scales its logic to match your career stage.</p>
                        <button className="flex items-center gap-2 font-black uppercase tracking-widest text-sm text-[#1d84b5]">
                            Explore Architecture <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="flex-1 space-y-4">
                        {[
                            'High-availability AI clusters',
                            'Automated keyword density balancing',
                            'Real-time recruiter logic updates',
                            'Multi-region data processing'
                        ].map(item => (
                            <div key={item} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200">
                                <CheckCircle2 className="text-[#1d84b5]" />
                                <span className="font-bold text-slate-800">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        </div>
    );
};

export const Solutions = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero */}
            <SectionLayout className="text-center pt-32">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
                    <Users size={16} className="text-[#1d84b5]" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Solutions for Everyone</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none mb-8">
                    Personalized <br />Paths to <span className="text-[#1d84b5]">Growth.</span>
                </h1>
            </SectionLayout>

            {/* 2. Individual Solution */}
            <SectionLayout className="bg-slate-50 py-32 rounded-[60px] mx-4 translate-y-[-20px] shadow-2xl z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black">For Individual <br />Job Seekers</h2>
                        <p className="text-lg text-slate-500 font-medium">Bypass the black hole of online applications. Our solution gives you the exact tools needed to get your foot in the door.</p>
                        <ul className="space-y-4">
                            {['Unlimited Resume Variants', 'AI Interview Coaching', 'Job Fit Scoring'].map(item => (
                                <li key={item} className="flex items-center gap-4 text-slate-800 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-[#1d84b5]" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="aspect-square bg-white rounded-[40px] border border-slate-200 p-12 flex items-center justify-center">
                        <Smartphone size={160} className="text-slate-100" />
                    </div>
                </div>
            </SectionLayout>

            {/* 3. Students Section */}
            <SectionLayout className="pt-48 pb-24">
                <div className="flex flex-col md:flex-row-reverse gap-20 items-center">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black">For Students & <br />Recent Grads</h2>
                        <p className="text-lg text-slate-500 font-medium">No experience? No problem. Our AI knows how to highlight your coursework, projects, and potential to make you a standout candidate.</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-6">
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h4 className="font-black mb-2">Academic Sync</h4>
                            <p className="text-sm text-slate-400">Maps courses to skills.</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h4 className="font-black mb-2">Project Focus</h4>
                            <p className="text-sm text-slate-400">Portfolio highlight engine.</p>
                        </div>
                    </div>
                </div>
            </SectionLayout>

            {/* 4. Enterprise */}
            <SectionLayout className="bg-[#132e32] text-white py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black">Work-Fast for Enterprise</h2>
                    <p className="text-lg text-slate-400 font-medium">Outplacement services, university career centers, and recruitment firms. Empower your people with the best career AI available.</p>
                    <button className="bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-200 transition-all">Contact Sales</button>
                </div>
            </SectionLayout>

            {/* 5. Success Stories */}
            <SectionLayout>
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl font-black">Industry-Specific Expertise</h2>
                    <p className="text-slate-500 font-medium">From Tech to Healthcare, we have tailored solutions for every sector.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Technology', 'Creative', 'Finance', 'Engineering', 'Healthcare', 'Education', 'Legal', 'Sales'].map(industry => (
                        <div key={industry} className="p-8 border border-slate-100 rounded-3xl text-center font-black uppercase tracking-widest text-xs text-slate-400 hover:border-[#1d84b5] hover:text-[#1d84b5] transition-all cursor-default">
                            {industry}
                        </div>
                    ))}
                </div>
            </SectionLayout>
        </div>
    );
};

export const Pricing = () => {
    return (
        <div className="bg-[#F8FAFC]">
            {/* 1. Hero */}
            <SectionLayout className="text-center pt-32 pb-16">
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none mb-8">
                    Simple, <br />Fair <span className="text-[#1d84b5]">Pricing.</span>
                </h1>
                <p className="text-lg font-medium text-slate-500">No hidden fees. No complex tiers. Just growth.</p>
            </SectionLayout>

            {/* 2. Pricing Tiers */}
            <SectionLayout>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Monthly */}
                    <div className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl space-y-8 relative overflow-hidden">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black">Monthly Access</h3>
                            <p className="text-slate-400 font-medium text-sm text-balance">The perfect choice for a single job hunt cycle.</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-slate-900">$5</span>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">/ month</span>
                        </div>
                        <ul className="space-y-4 pt-8 border-t border-slate-100">
                            {['Unlimited Resumes', 'AI Interview Prep', 'Keyword Analysis', '24/7 Support'].map(feat => (
                                <li key={feat} className="flex items-center gap-3 font-bold text-slate-600">
                                    <CheckCircle2 size={18} className="text-[#1d84b5]" /> {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-5 rounded-2xl border-2 border-slate-900 text-slate-900 font-black text-lg hover:bg-slate-900 hover:text-white transition-all">Choose Monthly</button>
                    </div>

                    {/* Annual */}
                    <div className="bg-slate-900 p-12 rounded-[40px] text-white shadow-2xl space-y-8 relative">
                        <div className="absolute top-8 right-8 bg-[#1d84b5] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Best Value</div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black">Annual Professional</h3>
                            <p className="text-slate-400 font-medium text-sm text-balance">Stay career-ready throughout the entire year.</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-white">$50</span>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">/ year</span>
                        </div>
                        <ul className="space-y-4 pt-8 border-t border-slate-800">
                            {['All Monthly Features', 'Priority AI Processing', 'Beta Feature Access', 'Personal Career Roadmap'].map(feat => (
                                <li key={feat} className="flex items-center gap-3 font-bold text-slate-300">
                                    <CheckCircle2 size={18} className="text-[#53a2be]" /> {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-5 rounded-2xl bg-white text-slate-900 font-black text-lg hover:bg-slate-200 transition-all">Get Yearly Access</button>
                    </div>
                </div>
            </SectionLayout>

            {/* 3. FAQ Preview */}
            <SectionLayout className="py-32">
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="text-4xl font-black text-center mb-16">Common Questions</h2>
                    {[
                        { q: 'Can I cancel anytime?', a: 'Yes, your subscription can be managed or canceled at any point from your dashboard.' },
                        { q: 'Is there a free trial?', a: 'You can generate your first resume preview for free to see the power of our AI.' },
                        { q: 'Multiple languages supported?', a: 'Currently focusing on English, with 12 more languages in beta.' }
                    ].map(faq => (
                        <div key={faq.q} className="space-y-2">
                            <h4 className="text-xl font-black text-slate-900">{faq.q}</h4>
                            <p className="text-slate-500 font-medium">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </SectionLayout>

            {/* 4. Money Back */}
            <SectionLayout className="bg-white border-y border-slate-100">
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <ShieldCheck size={48} className="mx-auto text-slate-200" />
                    <h3 className="text-2xl font-black">100% Satisfaction Guarantee</h3>
                    <p className="text-slate-500 font-medium">If Work-Fast doesn't help you land at least 2x more interviews within 30 days, we'll refund your last subscription payment, no questions asked.</p>
                </div>
            </SectionLayout>

            {/* 5. CTA Final */}
            <SectionLayout className="py-32 bg-gradient-to-b from-[#F8FAFC] to-white">
                <div className="bg-[#1d84b5] p-12 md:p-24 rounded-[60px] text-white text-center space-y-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black">Ready to scale your career?</h2>
                        <p className="text-lg text-[#ffffff90] font-medium max-w-xl mx-auto">Join the new generation of job seekers landing high-paying roles with AI assistance.</p>
                        <button className="mt-8 bg-white text-[#1d84b5] px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl">Get Started Now</button>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </SectionLayout>
        </div>
    );
};
