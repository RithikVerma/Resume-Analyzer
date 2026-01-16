import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { TabsList, TabsTrigger, TabsContent, Tabs } from './ui/tabs';
import { Upload, FileText } from 'lucide-react';

export default function InputForm({ onAnalyze }) {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [inputMode, setInputMode] = useState('file');
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resume Input */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Resume
                        </CardTitle>
                        <CardDescription>
                            Upload a file or paste text
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs className="w-full">
                            <TabsList className="mb-4 w-full">
                                <TabsTrigger
                                    active={inputMode === 'file'}
                                    onClick={() => setInputMode('file')}
                                    className="flex-1"
                                >
                                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                                    Upload
                                </TabsTrigger>
                                <TabsTrigger
                                    active={inputMode === 'text'}
                                    onClick={() => setInputMode('text')}
                                    className="flex-1"
                                >
                                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                                    Paste Text
                                </TabsTrigger>
                            </TabsList>

                            {inputMode === 'file' ? (
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                                            ? 'border-slate-400 bg-slate-50'
                                            : 'border-slate-200 hover:border-slate-300'
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
                                            <FileText className="h-12 w-12 mx-auto text-slate-400" />
                                            <p className="text-sm font-medium text-slate-900">{resumeFile.name}</p>
                                            <p className="text-xs text-slate-500">
                                                {(resumeFile.size / 1024).toFixed(2)} KB
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={removeFile}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <Upload className="h-12 w-12 mx-auto text-slate-400" />
                                            <div>
                                                <label
                                                    htmlFor="resume-file-input"
                                                    className="text-sm font-medium text-slate-900 hover:text-slate-700 cursor-pointer"
                                                >
                                                    Click to upload
                                                </label>
                                                <span className="text-sm text-slate-500"> or drag and drop</span>
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                PDF, DOC, or DOCX (max 5MB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <Textarea
                                        value={resumeText}
                                        onChange={(e) => setResumeText(e.target.value)}
                                        placeholder="Paste resume text here..."
                                        className="min-h-[280px] resize-none"
                                    />
                                    <div className="mt-2 text-right text-xs text-slate-500">
                                        {resumeText.length} characters
                                    </div>
                                </div>
                            )}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Job Description Input */}
                <Card>
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

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Analyze Resume
                </Button>
            </div>
        </form>
    );
}
