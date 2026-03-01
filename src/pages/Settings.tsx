import React from 'react';
import { User, Briefcase, Code, FileText, Award, GraduationCap, Quote, Mail, Globe, Linkedin, Github, Phone } from 'lucide-react';

const userData = {
    "personal_info": {
        "name": "Mudassir M. Shaik",
        "email": "skmudassir.it@gmail.com",
        "phone": "+1-901-415-0779",
        "website": "skmudassir.in",
        "linkedin": "https://www.linkedin.com/in/mudassirshaik/",
        "github": "https://github.com/skmudassir-it",
        "tagline": "A professional journey driven by innovation, problem-solving, and a commitment to excellence in engineering."
    },
    "experience": [
        {
            "company": "Attra, a Synechron Company",
            "role": "Software Engineer",
            "domain": "Financial Domain",
            "duration": "July 2021 - December 2022"
        },
        {
            "company": "Aditi Digital Solutions",
            "role": "Software Engineer",
            "domain": "Marketing & Media Domain",
            "duration": "February 2020 - May 2021"
        },
        {
            "company": "Aurangabad Electricals",
            "role": "R&D Engineer",
            "domain": "Manufacturing Domain",
            "duration": "October 2017 - November 2019"
        }
    ],
    "projects": [
        { "name": "Beauty and Company", "platform": "Shopify", "category": "E-commerce", "features": ["Mobile Apps (Android & iOS)"] },
        { "name": "Shop Hershe", "platform": "Shopify", "category": "E-commerce / Retail", "features": ["Mobile Apps (Android & iOS)"] },
        { "name": "Go Sticky Icky", "platform": "Shopify", "category": "E-commerce / Lifestyle", "features": ["Mobile Apps (Android & iOS)"] },
        { "name": "Sweet Cheeks Diaper Ministry", "platform": "WordPress", "category": "Non-Profit", "features": ["Community portal"] },
        { "name": "Q107.5", "platform": "Custom CMS", "category": "Radio / Streaming" },
        { "name": "Hot 107.1", "platform": "Custom CMS", "category": "Radio / Entertainment" },
        { "name": "AMSIT Services", "platform": "WordPress", "category": "B2B / Professional Services" },
        { "name": "American Metal and Saw", "platform": "Shopify", "category": "Industrial E-commerce" }
    ],
    "publications": [
        {
            "level": "Bachelor's",
            "title": "Design and Analysis of Disc Brake and Caliper of four wheeler",
            "journal": "International Journal of Science Technology & Engineering",
            "details": "Volume 3, Issue 8, ISSN 2349-784X. Peer-reviewed research."
        },
        {
            "level": "Master's",
            "title": "Impact of Artificial Intelligence on Corporate Leadership",
            "journal": "Scientific Research Publishing (SCIRP)",
            "details": "Open-access research article in a multidisciplinary science journal."
        }
    ],
    "certifications": {
        "aws": [
            "AWS Certified Developer – Associate",
            "AWS Certified Machine Learning Engineer – Associate",
            "AWS Certified Cloud Practitioner",
            "AWS Certified AI Practitioner"
        ],
        "microsoft_harvard": [
            "Azure DevOps Engineer Expert (AZ-400)",
            "Data Science: Machine Learning (HarvardX)"
        ],
        "data_science_python": [
            "Crash Course on Python (Google)",
            "IBM Data Science Foundations",
            "IBM Data Science Methodologies",
            "IBM Data Science Tools",
            "IBM Python for Data Science"
        ],
        "udemy_specializations": [
            "Linux for Data Engineers",
            "Python REST APIs with Flask & Docker",
            "Master Discrete Mathematics",
            "Complete PySpark & Colab Primer",
            "Deploy ML Models on GCP + AWS",
            "Natural Language Processing (NLP)",
            "Machine Learning Specialization (Advanced)"
        ]
    },
    "education": [
        { "institution": "Indiana Wesleyan University", "degree": "Masters in Information Technology Management", "period": "Jan 2023 - Dec 2024" },
        { "institution": "Chandigarh University", "degree": "MSc Data Science", "period": "Aug 2021 - Mar 2023" },
        { "institution": "Muffakham Jah College of Engg and Tech", "degree": "BE Mechanical Engineering", "period": "May 2014 - May 2017" },
        { "institution": "Govt Polytechnic Masabtank", "degree": "Diploma in Automobile Engineering" }
    ],
    "testimonials": [
        {
            "author": "Aileen Victor",
            "title": "Manager | Financial Services | Capgemini Technology India Pvt Ltd",
            "date": "June 22, 2025",
            "relationship": "Managed Mudassir directly",
            "text": "Mudassir is one of the best resource I have worked with during my time at Synchrony Financials. He has handled his projects deliverables efficiently and has coordinated well with the internal team and the client. He is a team player and has the skill set to deliver work with Quality."
        },
        {
            "author": "Dr. Daniel Schilling Weiss Nguyen, PhD",
            "title": "Doctor of Science in Computer Science Faculty",
            "date": "March 23, 2024",
            "relationship": "Academic Mentor at Indiana Wesleyan University",
            "text": "Mudassir happened to be one of my top students and research mentees at Indiana Wesleyan University (IWU). I rated him as one of the top 5% in the Information Systems Management Programs at IWU..."
        }
    ]
};

const Settings: React.FC = () => {
    return (
        <div className="space-y-12 pb-24">
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">
                        Profile Settings<span className="text-[#1d84b5]">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-2xl">
                        Manage your professional portfolio and account information.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                        Save Changes
                    </button>
                </div>
            </header>

            {/* Personal Info Card */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#1d84b5] opacity-5 rounded-full -mr-20 -mt-20 blur-3xl transition-opacity group-hover:opacity-10"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[32px] bg-gradient-to-br from-[#53a2be] to-[#1d84b5] flex items-center justify-center text-white shadow-xl shrink-0">
                        <User size={48} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-6 flex-1">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{userData.personal_info.name}</h2>
                            <p className="text-sm font-bold text-[#1d84b5] mt-2">{userData.personal_info.tagline}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                            {[
                                { icon: <Mail size={16} />, label: 'Email', value: userData.personal_info.email, isLink: false },
                                { icon: <Phone size={16} />, label: 'Phone', value: userData.personal_info.phone, isLink: false },
                                { icon: <Globe size={16} />, label: 'Website', value: userData.personal_info.website, isLink: true, href: `https://${userData.personal_info.website}` },
                                { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'LinkedIn Profile', isLink: true, href: userData.personal_info.linkedin },
                                { icon: <Github size={16} />, label: 'GitHub', value: 'GitHub Profile', isLink: true, href: userData.personal_info.github },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                        {item.icon}
                                    </div>
                                    {item.isLink ? (
                                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-[#1d84b5] transition-colors">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="text-sm font-semibold">{item.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">

                {/* Experience & Education Column */}
                <div className="space-y-8">
                    {/* Experience Section */}
                    <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Experience</h3>
                        </div>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-100 before:to-transparent">
                            {userData.experience.map((exp, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-slate-200 group-hover:bg-[#1d84b5] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10"></div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:border-[#1d84b5]/30 transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1d84b5]">{exp.duration}</span>
                                            <h4 className="font-black text-slate-900 leading-tight">{exp.role}</h4>
                                            <span className="text-sm font-bold text-slate-500">{exp.company}</span>
                                            <span className="inline-block mt-3 px-3 py-1 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-full border border-slate-100 w-fit">{exp.domain}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Education</h3>
                        </div>
                        <div className="space-y-6">
                            {userData.education.map((edu, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-[#1d84b5] mt-2 shrink-0"></div>
                                    <div>
                                        <h4 className="font-black text-slate-900">{edu.degree}</h4>
                                        <p className="text-sm font-bold text-slate-500">{edu.institution}</p>
                                        {edu.period && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-1">{edu.period}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Projects, Certs, Publications Column */}
                <div className="space-y-8">
                    {/* Projects Section */}
                    <section className="bg-slate-900 rounded-[40px] p-10 shadow-xl text-white relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-96 h-96 bg-[#1d84b5] opacity-20 rounded-full -mr-32 -mt-32 blur-3xl transition-opacity group-hover:opacity-30"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8 text-white">
                                <Code size={24} />
                                <h3 className="text-xl font-black uppercase tracking-tight">Key Projects</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                                {userData.projects.map((proj, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                                        <h4 className="font-bold text-white mb-1 truncate" title={proj.name}>{proj.name}</h4>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">{proj.platform}</span>
                                            <span className="px-2 py-1 bg-[#1d84b5]/20 text-[#53a2be] text-[10px] font-black rounded uppercase tracking-wider truncate max-w-[100px]" title={proj.category}>{proj.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Certifications Section */}
                    <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                                <Award size={24} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Certifications</h3>
                        </div>
                        <div className="space-y-6">
                            {Object.entries({
                                'AWS Certified': userData.certifications.aws,
                                'Microsoft & Harvard': userData.certifications.microsoft_harvard,
                                'Data Science & Python': userData.certifications.data_science_python,
                                'Specializations': userData.certifications.udemy_specializations
                            }).map(([category, certs], idx) => (
                                <div key={idx}>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1d84b5] mb-3">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {certs.map((cert, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Publications Section */}
                    <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Publications</h3>
                        </div>
                        <div className="space-y-6 divide-y divide-slate-50">
                            {userData.publications.map((item, i) => (
                                <div key={i} className="pt-6 first:pt-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-900 pr-4 leading-tight">{item.title}</h4>
                                        <span className="shrink-0 px-2 py-1 bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded">{item.level}</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 mb-2">{item.journal}</p>
                                    <p className="text-[10px] text-slate-400 tracking-wide">{item.details}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Testimonials Section */}
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm mt-8">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center">
                        <Quote size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Testimonials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData.testimonials.map((test, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="mb-8">
                                <Quote size={32} className="text-slate-200 mb-4" />
                                <p className="text-slate-600 text-sm font-medium italic leading-relaxed">"{test.text}"</p>
                            </div>
                            <div className="flex items-center gap-4 border-t border-slate-200 pt-6 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold shrink-0">
                                    {test.author.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <h5 className="font-black text-slate-900 text-sm truncate">{test.author}</h5>
                                    <p className="text-[10px] font-bold text-slate-400 truncate">{test.title}</p>
                                    <p className="text-[10px] text-slate-400 tracking-wider mt-1">{test.relationship} &bull; {test.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Settings;
