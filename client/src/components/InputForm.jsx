import { useState } from 'react';

export default function InputForm({ onAnalyze }) {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!resumeText.trim() || !jobDescription.trim()) {
            alert('Please provide both resume and job description.');
            return;
        }

        onAnalyze(resumeText, jobDescription);
    };

    return (
        <section className="mb-12">
            <form onSubmit={handleSubmit}>
                {/* Input Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Resume Input */}
                    <div className="glass-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                        <div className="flex items-center gap-2 mb-4 text-primary-light">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            <h2 className="text-xl font-heading font-semibold text-gray-100">Resume</h2>
                        </div>
                        <textarea
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            placeholder="Paste the candidate's resume here...

Include:
• Technical skills and tools
• Work experience and projects
• Education and certifications
• Achievements and responsibilities"
                            className="w-full min-h-[300px] bg-bg-primary/50 border border-white/5 rounded-lg p-4 text-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-y"
                            spellCheck="false"
                        />
                        <div className="mt-2 text-right text-sm text-gray-400">
                            <span className="text-primary-light font-medium">{resumeText.length}</span> characters
                        </div>
                    </div>

                    {/* Job Description Input */}
                    <div className="glass-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                        <div className="flex items-center gap-2 mb-4 text-primary-light">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            <h2 className="text-xl font-heading font-semibold text-gray-100">Job Description</h2>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here...

Include:
• Required skills and qualifications
• Responsibilities and duties
• Preferred experience level
• Nice-to-have skills"
                            className="w-full min-h-[300px] bg-bg-primary/50 border border-white/5 rounded-lg p-4 text-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-y"
                            spellCheck="false"
                        />
                        <div className="mt-2 text-right text-sm text-gray-400">
                            <span className="text-primary-light font-medium">{jobDescription.length}</span> characters
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                            <path d="M11 8a3 3 0 0 0-3 3" />
                        </svg>
                        <span>Analyze Resume</span>
                    </button>
                    <p className="mt-4 text-gray-400 text-sm">
                        Get instant AI-powered insights and recommendations
                    </p>
                </div>
            </form>
        </section>
    );
}
