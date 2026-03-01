import React, { useState } from 'react';
import { Code, MonitorPlay, FileCode2, Terminal, Database, ArrowRight, Briefcase, Loader2, CheckCircle2, XCircle } from 'lucide-react';

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

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const InterviewPrep: React.FC = () => {
    const [selectedTech, setSelectedTech] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState(false);

    const handleGenerateQuestions = async () => {
        if (!selectedTech || !selectedRole) return;

        setIsLoading(true);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);

        const techLabel = technologies.find(t => t.value === selectedTech)?.label || selectedTech;
        const roleLabel = focusRoles.find(r => r.value === selectedRole)?.label || selectedRole;

        const prompt = `You are an expert technical interviewer. Generate exactly 15 multiple-choice questions for a ${roleLabel} focusing on ${techLabel}. 
        Return ONLY a raw, valid JSON array of objects. Do not use markdown blocks, do not include any other text.
        Each object MUST have this exact structure:
        {
            "id": number (1-15),
            "question": "The text of the question",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": number (0-3, corresponding to the correct option index),
            "explanation": "A brief explanation of why the answer is correct."
        }`;

        try {
            const response = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-4241f1b27868414d8dd0155442809c53'}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        { role: "system", content: "You are a specialized technical interview question generator that outputs only raw JSON arrays." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 8000
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("DeepSeek API Error:", errorData);
                throw new Error(errorData.error?.message || `API returned ${response.status}`);
            }

            const data = await response.json();
            const messageContent = data.choices[0].message.content.trim();

            // Try to parse the content directly or extract json if it accidentally wrapped it in markdown
            let jsonString = messageContent;
            if (jsonString.startsWith('\`\`\`json')) {
                jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
            } else if (jsonString.startsWith('\`\`\`')) {
                jsonString = jsonString.replace(/\`\`\`/g, '').trim();
            }

            try {
                const parsedQuestions = JSON.parse(jsonString) as Question[];

                if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
                    setQuestions(parsedQuestions);
                } else {
                    throw new Error("API did not return a valid array of questions.");
                }
            } catch (parseError) {
                console.error("Failed to parse JSON:", jsonString);
                throw new Error("Failed to parse the response from the AI. The response might have been cut off or formatted incorrectly.");
            }
        } catch (error) {
            console.error('Error generating questions:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            alert(`Failed to generate questions. Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerSelect = (questionId: number, optionIndex: number) => {
        if (showResults) return;
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            if (userAnswers[q.id] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

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
                            onClick={handleGenerateQuestions}
                            disabled={!selectedTech || !selectedRole || isLoading}
                            className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md ${!selectedTech || !selectedRole || isLoading
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 cursor-pointer'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Generating Assessment...
                                </>
                            ) : (
                                <>
                                    Start Assessment <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {questions.length > 0 && (
                <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1d84b5]/10 text-[#1d84b5] rounded-2xl flex items-center justify-center">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Interview Quiz</h3>
                                <p className="text-slate-500 font-medium text-sm">
                                    {technologies.find(t => t.value === selectedTech)?.label} • {focusRoles.find(r => r.value === selectedRole)?.label}
                                </p>
                            </div>
                        </div>

                        {showResults && (
                            <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-200 text-center">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Your Score</p>
                                <p className="text-2xl font-black text-[#1d84b5]">
                                    {calculateScore()} <span className="text-slate-400 text-lg">/ {questions.length}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        {questions.length > 0 && !showResults && (
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 min-h-[400px]">
                                <h4 className="font-bold text-slate-900 mb-4 flex gap-3 text-lg">
                                    <span className="text-[#1d84b5] shrink-0">{currentQuestionIndex + 1}.</span>
                                    {questions[currentQuestionIndex].question}
                                </h4>

                                <div className="space-y-4 pl-7 mt-8">
                                    {questions[currentQuestionIndex].options.map((option, optIdx) => {
                                        const isSelected = userAnswers[questions[currentQuestionIndex].id] === optIdx;

                                        return (
                                            <button
                                                key={optIdx}
                                                onClick={() => handleAnswerSelect(questions[currentQuestionIndex].id, optIdx)}
                                                className={`w-full text-left px-6 py-4 rounded-xl border transition-all flex items-center justify-between gap-4 text-base ${isSelected
                                                    ? "bg-white border-[#1d84b5] ring-2 ring-[#1d84b5] text-[#1d84b5] font-medium shadow-md"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-[#1d84b5] hover:shadow-sm cursor-pointer"
                                                    }`}
                                            >
                                                <span>{option}</span>
                                                {isSelected && <CheckCircle2 size={20} className="text-[#1d84b5] shrink-0" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-12 flex justify-between items-center px-2">
                                    <div className="text-sm font-bold text-slate-400">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </div>

                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                            disabled={userAnswers[questions[currentQuestionIndex].id] === undefined}
                                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-colors ${userAnswers[questions[currentQuestionIndex].id] !== undefined
                                                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                                }`}
                                        >
                                            Next Question <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setShowResults(true)}
                                            disabled={userAnswers[questions[currentQuestionIndex].id] === undefined}
                                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-colors ${userAnswers[questions[currentQuestionIndex].id] !== undefined
                                                ? "bg-[#1d84b5] text-white hover:bg-[#166992] shadow-lg shadow-[#1d84b5]/20"
                                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                                }`}
                                        >
                                            Submit Assessment <CheckCircle2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {showResults && questions.map((q, index) => (
                            <div key={q.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-4 flex gap-3">
                                    <span className="text-[#1d84b5] shrink-0">{index + 1}.</span>
                                    {q.question}
                                </h4>

                                <div className="space-y-3 pl-7">
                                    {q.options.map((option, optIdx) => {
                                        const isSelected = userAnswers[q.id] === optIdx;
                                        const isCorrect = showResults && q.correctAnswer === optIdx;
                                        const isWrongSelection = showResults && isSelected && q.correctAnswer !== optIdx;

                                        let optionClasses = "w-full text-left px-5 py-3 rounded-xl border transition-all flex items-center justify-between gap-4 ";

                                        if (showResults) {
                                            if (isCorrect) {
                                                optionClasses += "bg-emerald-50 border-emerald-200 text-emerald-800 font-medium";
                                            } else if (isWrongSelection) {
                                                optionClasses += "bg-rose-50 border-rose-200 text-rose-800 font-medium";
                                            } else {
                                                optionClasses += "bg-white border-slate-200 text-slate-500 opacity-50";
                                            }
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                className={optionClasses}
                                            >
                                                <span>{option}</span>
                                                {showResults && isCorrect && <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />}
                                                {showResults && isWrongSelection && <XCircle size={18} className="text-rose-500 shrink-0" />}
                                            </div>
                                        );
                                    })}
                                </div>

                                {showResults && (
                                    <div className="mt-6 pl-7 animate-in fade-in duration-500">
                                        <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200">
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Explanation</p>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                                {q.explanation}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {questions.length === 0 && (
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
            )}
        </div>
    );
};

export default InterviewPrep;
