import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Upload, FileText } from 'lucide-react';

export default function InputForm({ onAnalyze }) {
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
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
        const maxSize = 5 * 1024 * 1024;

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

        if (!resumeFile) {
            alert('Please upload a resume file.');
            return;
        }

        if (!jobDescription.trim()) {
            alert('Please provide a job description.');
            return;
        }

        onAnalyze(resumeFile, jobDescription);
    };

    const removeFile = () => {
        setResumeFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-card border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Resume
                        </CardTitle>
                        <CardDescription>
                            Upload your resume file (PDF, DOC, or DOCX)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`border-2 rounded-xl p-10 text-center transition-smooth ${isDragging
                                ? 'border-blue-400 bg-blue-50 border-solid'
                                : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-slate-50'
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
                                <div className="space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mx-auto">
                                        <FileText className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-base font-semibold text-slate-900">{resumeFile.name}</p>
                                    <p className="text-sm text-slate-600">
                                        {(resumeFile.size / 1024).toFixed(2)} KB
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={removeFile}
                                        className="transition-smooth"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="h-14 w-14 mx-auto text-blue-500" />
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="resume-file-input"
                                            className="text-base font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-smooth"
                                        >
                                            Click to upload
                                        </label>
                                        <p className="text-sm text-slate-600">or drag and drop</p>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        PDF, DOC, or DOCX (max 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-card border-slate-200">
                    <CardHeader>
                        <CardTitle>Job Description</CardTitle>
                        <CardDescription>
                            Paste the job description
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste job description here..."
                            className="min-h-[280px] resize-none"
                        />
                        <div className="mt-2 text-right text-xs text-slate-500">
                            {jobDescription.length} characters
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center pt-4">
                <Button type="submit" size="lg" className="w-full sm:w-auto text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-smooth">
                    Analyze Resume
                </Button>
            </div>
        </form>
    );
}
