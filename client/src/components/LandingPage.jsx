import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Target, Sparkles, TrendingUp, ArrowRight, Users, Award, Briefcase, ChevronDown } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const features = [
        {
            icon: Target,
            title: 'Smart Matching',
            description: 'AI-powered analysis matches your resume against job requirements with precision'
        },
        {
            icon: TrendingUp,
            title: 'ATS Score',
            description: 'Get an instant ATS compatibility score to improve your chances of getting noticed'
        },
        {
            icon: Sparkles,
            title: 'Skill Analysis',
            description: 'Identify missing skills and get actionable recommendations for improvement'
        },
        {
            icon: FileText,
            title: 'Detailed Feedback',
            description: 'Receive comprehensive feedback on your resume content and structure'
        }
    ];





    const faqs = [
        {
            question: "What file formats are supported?",
            answer: "We support PDF, DOC, and DOCX file formats. Maximum file size is 5MB."
        },
        {
            question: "Is my data safe and private?",
            answer: "Absolutely. We don't store your resume or job description data. All analysis happens in real-time and data is discarded after processing."
        },
        {
            question: "How accurate is the AI analysis?",
            answer: "Our AI is trained on thousands of successful resumes and job descriptions. It provides highly accurate matching scores and actionable feedback based on industry best practices."
        },
        {
            question: "Is this service free?",
            answer: "Yes! The AI Resume Analyzer is completely free to use. Analyze as many resumes as you need without any cost."
        },
        {
            question: "How long does the analysis take?",
            answer: "Analysis typically takes 5-10 seconds. You'll receive instant feedback on your resume's compatibility with the job description."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="space-y-32">
            {/* Hero Section */}
            <section id="hero" className="text-center space-y-8 pt-12 pb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4 shadow-soft">
                    <Sparkles className="h-4 w-4" />
                    AI-Powered Resume Analysis
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight text-balance tracking-tight">
                    Optimize Your Resume
                    <br />
                    <span className="text-blue-600">for Success</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto text-balance leading-relaxed">
                    Get instant AI-powered feedback on how well your resume matches job descriptions.
                    Improve your ATS score and land more interviews.
                </p>

                <div className="pt-6">
                    <Button
                        size="lg"
                        onClick={onGetStarted}
                        className="group shadow-lg text-lg px-8 py-6 hover:shadow-xl transition-smooth"
                    >
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </section>



            {/* Features Section */}
            <section id="features" className="space-y-8 py-16">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl font-semibold text-slate-900">
                        Everything You Need
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Powerful features to help you create a resume that stands out
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="border-0 shadow-elevated hover:shadow-floating hover:-translate-y-2 transition-smooth">
                                <CardHeader className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-blue-50 shadow-soft">
                                            <Icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="space-y-2">
                                            <CardTitle className="text-xl font-semibold">
                                                {feature.title}
                                            </CardTitle>
                                            <CardDescription className="text-base text-slate-600">
                                                {feature.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </section>



            {/* How It Works Section */}
            <section id="how-it-works" className="space-y-8 py-16 border-t border-slate-200">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl font-semibold text-slate-900">
                        How It Works
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Simple, fast, and effective
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            Upload Resume
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed">
                            Upload your resume in PDF, DOC, or DOCX format
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            Add Job Description
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed">
                            Paste the job description you're targeting
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            Get Insights
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed">
                            Receive detailed analysis and actionable recommendations
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="space-y-8 py-16 border-t border-slate-200">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl font-semibold text-slate-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Everything you need to know about the analyzer
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-smooth">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-smooth"
                            >
                                <span className="font-semibold text-slate-900 text-lg">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 text-slate-600 transition-smooth ${openFaqIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openFaqIndex === index && (
                                <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-slate-700 text-base leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-6 py-16 border-t border-slate-200">
                <h2 className="text-3xl font-semibold text-slate-900">
                    Ready to Improve Your Resume?
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto">
                    Start analyzing your resume today and increase your chances of landing your dream job
                </p>
                <Button
                    size="lg"
                    onClick={onGetStarted}
                    className="group"
                >
                    Start Free Analysis
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </section>
        </div>
    );
}
