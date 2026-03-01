import React from 'react';
import { Shield, FileText, Lock, Eye, Scale, Zap } from 'lucide-react';

const LegalLayout: React.FC<{ title: string; lastUpdated: string; children: React.ReactNode }> = ({ title, lastUpdated, children }) => (
    <div className="min-h-screen bg-white py-24 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">{title}</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Last Updated: {lastUpdated}</p>
            </div>
            <div className="prose prose-slate max-w-none">
                {children}
            </div>
        </div>
    </div>
);

export const Privacy = () => (
    <LegalLayout title="Privacy Policy" lastUpdated="March 1, 2026">
        <div className="space-y-12 text-slate-600 font-medium leading-relaxed">
            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Shield className="text-[#1d84b5]" /> 1. Information Storage
                </h2>
                <p>We respect your privacy. All job descriptions and resumes generated via Work-Fast are processed securely. We do not sell your personal data to third parties.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Lock className="text-[#1d84b5]" /> 2. Data Security
                </h2>
                <p>We use industry-standard encryption to protect your information during transmission and storage. Your career data is your own.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Eye className="text-[#1d84b5]" /> 3. Tracking & Cookies
                </h2>
                <p>We use essential cookies to maintain your session and improve our AI engine's performance. You can opt-out of non-essential tracking in your browser settings.</p>
            </section>
        </div>
    </LegalLayout>
);

export const Terms = () => (
    <LegalLayout title="Terms of Service" lastUpdated="March 1, 2026">
        <div className="space-y-12 text-slate-600 font-medium leading-relaxed">
            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Scale className="text-[#1d84b5]" /> 1. Acceptance of Terms
                </h2>
                <p>By using Work-Fast, you agree to these terms. Our platform provides AI-driven career tools intended for professional use.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <FileText className="text-[#1d84b5]" /> 2. User Responsibilities
                </h2>
                <p>Users are responsible for the accuracy of the information provided and generated. Work-Fast does not guarantee employment results.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Zap className="text-[#1d84b5]" /> 3. AI Service Limits
                </h2>
                <p>Usage of our AI engine is subject to fair-use policies. We reserve the right to limit access to prevent abuse of our generation services.</p>
            </section>
        </div>
    </LegalLayout>
);
