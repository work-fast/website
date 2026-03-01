import React, { useState } from 'react';
import { Code, MonitorPlay, FileCode2, Terminal, Database, ArrowRight, Briefcase } from 'lucide-react';

const technologies = [
    { value: 'java', label: 'Java', category: 'Backend' },
    { value: 'python', label: 'Python', category: 'Backend/Data' },
    { value: 'javascript', label: 'JavaScript', category: 'Frontend/Backend' },
    { value: 'html', label: 'HTML', category: 'Frontend' },
    { value: 'css', label: 'CSS', category: 'Frontend' },
    { value: 'go', label: 'Go', category: 'Backend' },
    { value: 'c', label: 'C / C++', category: 'Systems' },
    { value: 'dotnet', label: '.NET', category: 'Backend' },
    { value: 'ruby', label: 'Ruby', category: 'Backend' },
    { value: 'php', label: 'PHP', category: 'Backend' },
    { value: 'swift', label: 'Swift', category: 'Mobile' },
    { value: 'kotlin', label: 'Kotlin', category: 'Mobile/Backend' },
    { value: 'rust', label: 'Rust', category: 'Systems' },
    { value: 'sql', label: 'SQL', category: 'Database' },
    { value: 'react', label: 'React', category: 'Frontend' },
    { value: 'angular', label: 'Angular', category: 'Frontend' },
    { value: 'vue', label: 'Vue.js', category: 'Frontend' },
    { value: 'node', label: 'Node.js', category: 'Backend' },
    { value: 'spring', label: 'Spring Boot', category: 'Backend' }
];

const focusRoles = [
    { value: 'intern', label: 'Intern / Student' },
    { value: 'entry', label: 'Entry Level / Junior' },
    { value: 'associate', label: 'Associate / Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead / Principal' },
    { value: 'manager', label: 'Engineering Manager' }
];

const InterviewPrep: React.FC = () => {
    const [selectedTech, setSelectedTech] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">
                        Interview Prep<span className="text-[#1d84b5]">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-2xl">
                        Select a technology to generate tailored interview questions and prepare for your next role.
                    </p>
                </div>
            </header>

            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                        <MonitorPlay size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Select Technology</h3>
                </div>

                <div className="max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500">
                                Target Technology
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedTech}
                                    onChange={(e) => setSelectedTech(e.target.value)}
                                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 pr-10 text-slate-900 font-medium focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all cursor-pointer"
                                >
                                    <option value="" disabled>Choose a technology...</option>
                                    {technologies.map((tech) => (
                                        <option key={tech.value} value={tech.value}>
                                            {tech.label} ({tech.category})
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                    <Code size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500">
                                Focus Role
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 pr-10 text-slate-900 font-medium focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all cursor-pointer"
                                >
                                    <option value="" disabled>Choose a role...</option>
                                    {focusRoles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                    <Briefcase size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            disabled={!selectedTech || !selectedRole}
                            className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md ${selectedTech && selectedRole
                                ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 cursor-pointer'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            Generate Questions <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-white text-[#1d84b5] rounded-full flex items-center justify-center shadow-sm">
                        <FileCode2 size={24} />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-slate-900">Syntax & API</h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">Brush up on core language features and standard libraries.</p>
                </div>
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-white text-[#1d84b5] rounded-full flex items-center justify-center shadow-sm">
                        <Terminal size={24} />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-slate-900">Problem Solving</h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">Practice common coding challenges and algorithms.</p>
                </div>
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-white text-[#1d84b5] rounded-full flex items-center justify-center shadow-sm">
                        <Database size={24} />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-slate-900">System Design</h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">Understand architecture and best practices for the tech stack.</p>
                </div>
            </section>
        </div>
    );
};

export default InterviewPrep;
