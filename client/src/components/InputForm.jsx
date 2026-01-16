import { useState, useRef } from 'react';

export default function InputForm({ onAnalyze }) {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const validateAndSetFile = (file) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload a PDF, DOC, or DOCX file.');
            return;
        }

        if (file.size > maxSize) {
            alert('File size exceeds 5MB limit.');
            return;
        }

        setResumeFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs based on mode
        if (inputMode === 'file') {
            if (!resumeFile) {
                alert('Please upload a resume file.');
                return;
            }
        } else {
            if (!resumeText.trim()) {
                alert('Please provide resume text.');
                return;
            }
        }

        if (!jobDescription.trim()) {
            alert('Please provide a job description.');
            return;
        }

        onAnalyze(inputMode === 'file' ? resumeFile : resumeText, jobDescription, inputMode);
    };

    const removeFile = () => {
        setResumeFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <section className="mb-12">
            <form onSubmit={handleSubmit}>
                {/* Input Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Resume Input */}
                    <div className="glass-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-primary-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                                <h2 className="text-xl font-heading font-semibold text-gray-100">Resume</h2>
                            </div>

                            {/* Toggle between file upload and text input */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setInputMode('file')}
                                    className={`px-3 py-1 text-sm rounded transition-all ${inputMode === 'file'
                                            ? 'bg-primary text-white'
                                            : 'bg-bg-primary/50 text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    Upload
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInputMode('text')}
                                    className={`px-3 py-1 text-sm rounded transition-all ${inputMode === 'text'
                                            ? 'bg-primary text-white'
                                            : 'bg-bg-primary/50 text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    Paste Text
                                </button>
                            </div>
                        </div>

                        {inputMode === 'file' ? (
                            <>
                                {/* File Upload Area */}
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isDragging
                                            ? 'border-primary bg-primary/10'
                                            : 'border-white/10 hover:border-primary/50'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        id="resume-file-input"
                                    />

                                    {resumeFile ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center gap-2 text-primary-light">
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-100 font-medium">{resumeFile.name}</p>
                                            <p className="text-sm text-gray-400">
                                                {(resumeFile.size / 1024).toFixed(2)} KB
                                            </p>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="text-red-400 hover:text-red-300 text-sm underline"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="17 8 12 3 7 8" />
                                                    <line x1="12" y1="3" x2="12" y2="15" />
                                                </svg>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="resume-file-input"
                                                    className="text-primary-light hover:text-primary cursor-pointer font-medium"
                                                >
                                                    Click to upload
                                                </label>
                                                <span className="text-gray-400"> or drag and drop</span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                PDF, DOC, or DOCX (max 5MB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Text Input */}
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
                            </>
                        )}
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
