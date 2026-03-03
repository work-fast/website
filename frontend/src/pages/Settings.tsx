import React, { useState, useRef, useEffect } from 'react';
import { User, Briefcase, Code, FileText, Award, GraduationCap, Quote, Plus, Trash2, Save, Download, Upload, FileJson, ChevronDown } from 'lucide-react';
import { auth } from '../lib/auth';

interface ExperienceItem { company: string; role: string; domain: string; duration: string; }
interface ProjectItem { name: string; platform: string; category: string; features: string; }
interface PublicationItem { level: string; title: string; journal: string; details: string; }
interface EducationItem { institution: string; degree: string; period: string; }
interface TestimonialItem { author: string; title: string; date: string; relationship: string; text: string; }

// Initial empty/default state structure based on the provided JSON
const initialData = {
    personal_info: {
        name: "", email: "", phone: "", website: "", linkedin: "", github: "", tagline: ""
    },
    experience: [] as ExperienceItem[],
    projects: [] as ProjectItem[],
    publications: [] as PublicationItem[],
    certifications: {
        aws: [] as string[], microsoft_harvard: [] as string[], data_science_python: [] as string[], udemy_specializations: [] as string[]
    },
    education: [] as EducationItem[],
    testimonials: [] as TestimonialItem[]
};

const Settings: React.FC = () => {
    const [formData, setFormData] = useState(initialData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize with existing data on mount if available
    useEffect(() => {
        const user = auth.getUser();
        if (user && user.profileData) {
            setFormData(user.profileData);
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSave = async () => {
        try {
            await auth.updateUserProfile({ profileData: formData });
            alert("Settings saved successfully to database!");
        } catch (error) {
            console.error("Error saving settings to database", error);
            alert("Failed to save settings.");
        }
    };

    const handleDownloadTemplate = () => {
        const blob = new Blob([JSON.stringify(initialData, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workfast_profile_template.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDropdownOpen(false);
    };

    const handleDownloadJSON = () => {
        const user = auth.getUser();
        const username = user?.name || 'user';
        const date = new Date().toISOString().split('T')[0];
        const filename = `${username}_${date}.json`;

        const blob = new Blob([JSON.stringify(formData, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDropdownOpen(false);
    };

    const handleUploadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (json.personal_info) {
                    setFormData(json);
                    alert("JSON loaded successfully!");
                } else {
                    alert("Invalid JSON structure. Please use the template format.");
                }
            } catch (error) {
                console.error("Error parsing JSON", error);
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
        setIsDropdownOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
    };

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            personal_info: { ...formData.personal_info, [e.target.name]: e.target.value }
        });
    };

    const handleArrayChange = (section: 'experience' | 'projects' | 'publications' | 'education' | 'testimonials', index: number, field: string, value: string) => {
        const newArray = [...formData[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        setFormData({ ...formData, [section]: newArray });
    };

    const addItem = (section: keyof typeof initialData, emptyItem: any) => {
        const currentData = formData[section] as any[];
        setFormData({ ...formData, [section]: [...currentData, emptyItem] });
    };

    const removeItem = (section: 'experience' | 'projects' | 'publications' | 'education' | 'testimonials', index: number) => {
        const newArray = [...formData[section]];
        newArray.splice(index, 1);
        setFormData({ ...formData, [section]: newArray });
    };

    const handleCertChange = (category: 'aws' | 'microsoft_harvard' | 'data_science_python' | 'udemy_specializations', index: number, value: string) => {
        const newCerts = [...formData.certifications[category]];
        newCerts[index] = value;
        setFormData({
            ...formData,
            certifications: { ...formData.certifications, [category]: newCerts }
        });
    };

    const addCert = (category: keyof typeof initialData.certifications) => {
        const currentCerts = formData.certifications[category] as string[];
        setFormData({
            ...formData,
            certifications: { ...formData.certifications, [category]: [...currentCerts, ""] }
        });
    };

    const removeCert = (category: 'aws' | 'microsoft_harvard' | 'data_science_python' | 'udemy_specializations', index: number) => {
        const newCerts = [...formData.certifications[category]];
        newCerts.splice(index, 1);
        setFormData({
            ...formData,
            certifications: { ...formData.certifications, [category]: newCerts }
        });
    };

    return (
        <div className="space-y-12 pb-24">
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">
                        Profile Settings<span className="text-[#1d84b5]">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-2xl">
                        Update your professional portfolio and account information.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                        >
                            <FileJson size={16} /> Import / Export <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1d84b5] rounded-xl font-bold transition-all"
                                    >
                                        <Upload size={16} /> Upload JSON
                                    </button>
                                    <button
                                        onClick={handleDownloadJSON}
                                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1d84b5] rounded-xl font-bold transition-all"
                                    >
                                        <Download size={16} /> Download JSON
                                    </button>
                                    <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                    <button
                                        onClick={handleDownloadTemplate}
                                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
                                    >
                                        <FileText size={16} /> Download Blank Template
                                    </button>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            accept=".json"
                            ref={fileInputRef}
                            onChange={handleUploadJSON}
                            className="hidden"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </header>

            {/* Personal Info Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                        <User size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Full Name</label>
                        <input type="text" name="name" value={formData.personal_info.name} onChange={handlePersonalInfoChange} placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email</label>
                        <input type="email" name="email" value={formData.personal_info.email} onChange={handlePersonalInfoChange} placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Phone</label>
                        <input type="tel" name="phone" value={formData.personal_info.phone} onChange={handlePersonalInfoChange} placeholder="+1 234 567 8900" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Website</label>
                        <input type="text" name="website" value={formData.personal_info.website} onChange={handlePersonalInfoChange} placeholder="johndoe.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">LinkedIn URL</label>
                        <input type="url" name="linkedin" value={formData.personal_info.linkedin} onChange={handlePersonalInfoChange} placeholder="https://linkedin.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">GitHub URL</label>
                        <input type="url" name="github" value={formData.personal_info.github} onChange={handlePersonalInfoChange} placeholder="https://github.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Professional Tagline</label>
                        <textarea name="tagline" value={formData.personal_info.tagline} onChange={handlePersonalInfoChange} placeholder="A short description of your professional identity..." rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#1d84b5] focus:ring-1 focus:ring-[#1d84b5] transition-all"></textarea>
                    </div>
                </div>
            </section>

            {/* Experience Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Experience</h3>
                    </div>
                    <button onClick={() => addItem('experience', { company: '', role: '', domain: '', duration: '' })} className="flex items-center gap-2 text-sm font-bold text-[#1d84b5] hover:text-[#156a91] transition-colors bg-blue-50 px-4 py-2 rounded-xl">
                        <Plus size={16} /> Add Experience
                    </button>
                </div>
                <div className="space-y-6">
                    {formData.experience.map((exp: any, i) => (
                        <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button onClick={() => removeItem('experience', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} placeholder="Company Name" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} placeholder="Job Role" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={exp.domain} onChange={(e) => handleArrayChange('experience', i, 'domain', e.target.value)} placeholder="Domain / Industry" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={exp.duration} onChange={(e) => handleArrayChange('experience', i, 'duration', e.target.value)} placeholder="Duration (e.g., Jan 2020 - Present)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                            </div>
                        </div>
                    ))}
                    {formData.experience.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No experience entries yet.</p>}
                </div>
            </section>

            {/* Education Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Education</h3>
                    </div>
                    <button onClick={() => addItem('education', { institution: '', degree: '', period: '' })} className="flex items-center gap-2 text-sm font-bold text-[#1d84b5] hover:text-[#156a91] transition-colors bg-blue-50 px-4 py-2 rounded-xl">
                        <Plus size={16} /> Add Education
                    </button>
                </div>
                <div className="space-y-6">
                    {formData.education.map((edu: any, i) => (
                        <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button onClick={() => removeItem('education', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" value={edu.institution} onChange={(e) => handleArrayChange('education', i, 'institution', e.target.value)} placeholder="Institution Name" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} placeholder="Degree / Certificate" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={edu.period} onChange={(e) => handleArrayChange('education', i, 'period', e.target.value)} placeholder="Period (e.g., 2018 - 2022)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm md:col-span-2" />
                            </div>
                        </div>
                    ))}
                    {formData.education.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No education entries yet.</p>}
                </div>
            </section>

            {/* Projects Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                            <Code size={24} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Key Projects</h3>
                    </div>
                    <button onClick={() => addItem('projects', { name: '', platform: '', category: '', features: '' })} className="flex items-center gap-2 text-sm font-bold text-[#1d84b5] hover:text-[#156a91] transition-colors bg-blue-50 px-4 py-2 rounded-xl">
                        <Plus size={16} /> Add Project
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {formData.projects.map((proj: any, i) => (
                        <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button onClick={() => removeItem('projects', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="space-y-4">
                                <input type="text" value={proj.name} onChange={(e) => handleArrayChange('projects', i, 'name', e.target.value)} placeholder="Project Name" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" value={proj.platform} onChange={(e) => handleArrayChange('projects', i, 'platform', e.target.value)} placeholder="Platform (e.g. Shopify)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                    <input type="text" value={proj.category} onChange={(e) => handleArrayChange('projects', i, 'category', e.target.value)} placeholder="Category (e.g. E-commerce)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                </div>
                                <input type="text" value={proj.features || ''} onChange={(e) => handleArrayChange('projects', i, 'features', e.target.value)} placeholder="Key Features (comma separated)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500" />
                            </div>
                        </div>
                    ))}
                </div>
                {formData.projects.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No projects added yet.</p>}
            </section>

            {/* Publications Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Publications</h3>
                    </div>
                    <button onClick={() => addItem('publications', { level: '', title: '', journal: '', details: '' })} className="flex items-center gap-2 text-sm font-bold text-[#1d84b5] hover:text-[#156a91] transition-colors bg-blue-50 px-4 py-2 rounded-xl">
                        <Plus size={16} /> Add Publication
                    </button>
                </div>
                <div className="space-y-6">
                    {formData.publications.map((pub: any, i) => (
                        <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button onClick={() => removeItem('publications', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" value={pub.level} onChange={(e) => handleArrayChange('publications', i, 'level', e.target.value)} placeholder="Level (e.g. Master's)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={pub.title} onChange={(e) => handleArrayChange('publications', i, 'title', e.target.value)} placeholder="Publication Title" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm md:col-span-2 font-bold" />
                                <input type="text" value={pub.journal} onChange={(e) => handleArrayChange('publications', i, 'journal', e.target.value)} placeholder="Journal Name" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm md:col-span-1" />
                                <textarea value={pub.details} onChange={(e) => handleArrayChange('publications', i, 'details', e.target.value)} placeholder="Details & Description..." rows={2} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm md:col-span-2"></textarea>
                            </div>
                        </div>
                    ))}
                    {formData.publications.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No publications added yet.</p>}
                </div>
            </section>

            {/* Certifications Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                        <Award size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Certifications</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Object.keys(formData.certifications).map((category) => (
                        <div key={category} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1d84b5]">{category.replace(/_/g, ' ')}</h4>
                                <button onClick={() => addCert(category as any)} className="text-slate-400 hover:text-[#1d84b5] transition-colors"><Plus size={16} /></button>
                            </div>
                            <div className="space-y-3">
                                {(formData.certifications as any)[category].map((cert: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input type="text" value={cert} onChange={(e) => handleCertChange(category as any, i, e.target.value)} placeholder="Certification Name" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                        <button onClick={() => removeCert(category as any, i)} className="text-slate-400 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Form */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                            <Quote size={24} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Testimonials</h3>
                    </div>
                    <button onClick={() => addItem('testimonials', { author: '', title: '', date: '', relationship: '', text: '' })} className="flex items-center gap-2 text-sm font-bold text-[#1d84b5] hover:text-[#156a91] transition-colors bg-blue-50 px-4 py-2 rounded-xl">
                        <Plus size={16} /> Add Testimonial
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {formData.testimonials.map((test: any, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-200 relative group flex flex-col gap-4">
                            <button onClick={() => removeItem('testimonials', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <input type="text" value={test.author} onChange={(e) => handleArrayChange('testimonials', i, 'author', e.target.value)} placeholder="Author Name" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold" />
                            <input type="text" value={test.title} onChange={(e) => handleArrayChange('testimonials', i, 'title', e.target.value)} placeholder="Author Title / Role" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500" />
                            <div className="flex gap-4">
                                <input type="text" value={test.date} onChange={(e) => handleArrayChange('testimonials', i, 'date', e.target.value)} placeholder="Date (e.g. June 2025)" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                <input type="text" value={test.relationship} onChange={(e) => handleArrayChange('testimonials', i, 'relationship', e.target.value)} placeholder="Relationship" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <textarea value={test.text} onChange={(e) => handleArrayChange('testimonials', i, 'text', e.target.value)} placeholder="Testimonial Text..." rows={4} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 italic"></textarea>
                        </div>
                    ))}
                </div>
                {formData.testimonials.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No testimonials added yet.</p>}
            </section>
        </div>
    );
};

export default Settings;
