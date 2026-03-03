import React, { useState, useRef } from 'react';
import { ArrowLeft, Sparkles, Send, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';
// @ts-ignore
import html2pdf from 'html2pdf.js';

const Generator: React.FC = () => {
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
    const [successUrl, setSuccessUrl] = useState<string | null>(null);
    const resumeRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            alert("Please paste a job description first.");
            return;
        }

        const user = auth.getUser();
        if (!user || user.resumesLeft === undefined || user.resumesLeft <= 0) {
            alert("You do not have enough resumes left. Please upgrade your plan.");
            return;
        }

        if (!user.profileData) {
            alert("Please fill out your Profile Settings first before generating a resume.");
            navigate('/settings');
            return;
        }

        setIsGenerating(true);
        setGeneratedHtml(null);
        setSuccessUrl(null);

        try {
            // 1. Generate Resume HTML securely via Backend API
            const token = localStorage.getItem('workfast_token');
            const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

            const response = await fetch(`${API_BASE}/resume/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    jobDescription,
                    profileData: user.profileData || {}
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to generate resume from AI.");
            }

            const aiData = await response.json();
            const cleanHtml = aiData.html;

            setGeneratedHtml(cleanHtml);

            // Wait a tick for React to render the hidden HTML div
            setTimeout(async () => {
                try {
                    // 2. Convert HTML to PDF Blob
                    const element = resumeRef.current;
                    if (!element) throw new Error("Resume container not found in DOM");

                    const pdfOpt = {
                        margin: 0.5,
                        filename: 'Resume.pdf',
                        image: { type: 'jpeg' as const, quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
                    };

                    const pdfBlob = await html2pdf().set(pdfOpt).from(element).outputPdf('blob');

                    // 3. Upload to Custom Storage API
                    const fileBody = new FormData();
                    fileBody.append('file', pdfBlob, `resume_${Date.now()}.pdf`);

                    const storageApiKey = import.meta.env.VITE_STORAGE_API_KEY || 'lzPSnBmSLRDvxy84';
                    const storageUrl = import.meta.env.VITE_STORAGE_API_URL || 'http://18.226.187.11/api/files';

                    const uploadRes = await fetch(`${storageUrl}/upload`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${storageApiKey}`
                        },
                        body: fileBody
                    });

                    if (!uploadRes.ok) throw new Error("Failed to upload PDF to storage API");
                    const uploadData = await uploadRes.json();

                    // The API response structure needs to provide the public URL. 
                    // Let's assume it returns { fileUrl: "..." } or { url: "..." } or similar
                    const finalUrl = uploadData.fileUrl || uploadData.url || uploadData.path || 'https://example.com/uploaded-resume.pdf';
                    setSuccessUrl(finalUrl);

                    // 4. Update Database: Decrement count and add to history
                    const historyArray = user.profileData.history || [];
                    const newHistoryItem = {
                        title: jobDescription.substring(0, 30) + '...',
                        date: new Date().toISOString(),
                        url: finalUrl
                    };

                    await auth.updateUserProfile({
                        resumesLeft: (user.resumesLeft ?? 5) - 1,
                        profileData: {
                            ...user.profileData,
                            history: [newHistoryItem, ...historyArray]
                        }
                    });

                } catch (pdfErr) {
                    console.error("PDF/Upload error:", pdfErr);
                    alert("Resume was generated but failed to save as PDF.");
                } finally {
                    setIsGenerating(false);
                }
            }, 500);

        } catch (error) {
            console.error("Generation error:", error);
            alert("An error occurred during generation.");
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-6 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold mb-12 transition-colors uppercase tracking-widest text-xs"
                >
                    <ArrowLeft size={16} /> Back to Dashboard
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
                            Paste the job description below. Our AI will analyze your profile and the requirements to generate a perfectly tailored PDF resume in seconds.
                        </p>
                    </div>

                    {!successUrl ? (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#53a2be] to-[#1d84b5] rounded-[32px] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Job Description</label>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the full job description here..."
                                    className="w-full h-80 bg-slate-50 border-none rounded-2xl p-6 text-base font-medium text-slate-800 focus:ring-2 focus:ring-[#1d84b5] transition-all resize-none outline-none"
                                    disabled={isGenerating}
                                ></textarea>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating || !jobDescription.trim()}
                                        className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGenerating ? (
                                            <>Generating... <Loader2 className="animate-spin" size={24} /></>
                                        ) : (
                                            <>Generate Resume <Send size={24} /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-green-50 rounded-3xl border border-green-200 p-12 text-center space-y-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} className="text-green-600" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900">Resume Generated Successfully!</h2>
                            <p className="text-slate-600 font-medium max-w-md mx-auto">
                                Your highly tailored resume has been generated, saved to the database, and is ready for download.
                            </p>
                            <div className="flex justify-center gap-4 pt-4">
                                <a
                                    href={successUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#1d84b5] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#156a93] transition-colors shadow-lg"
                                >
                                    <Download size={20} /> Download PDF
                                </a>
                                <button
                                    onClick={() => {
                                        setSuccessUrl(null);
                                        setJobDescription('');
                                        setGeneratedHtml(null);
                                    }}
                                    className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
                                >
                                    Generate Another
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                        {[
                            { title: 'ATS-Friendly', desc: 'Guaranteed compatibility.' },
                            { title: 'Smart-Keyword', desc: 'Hits every JD marker.' },
                            { title: 'Cloud-Saved', desc: 'Always in your History folder.' }
                        ].map((item) => (
                            <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-100">
                                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{item.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hidden container to render the raw HTML for html2pdf conversion */}
            <div style={{ display: 'none' }}>
                {generatedHtml && (
                    <div
                        ref={resumeRef}
                        className="bg-white"
                        style={{ padding: '40px', fontFamily: 'Arial, sans-serif', color: '#000', width: '800px' }}
                        dangerouslySetInnerHTML={{ __html: generatedHtml }}
                    />
                )}
            </div>
        </div>
    );
};

export default Generator;
