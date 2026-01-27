import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

export default function ScoreCard({ matchScore, candidateLevel }) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedScore(matchScore), 100);
        return () => clearTimeout(timer);
    }, [matchScore]);

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 60) return 'text-amber-600';
        return 'text-rose-600';
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return 'from-emerald-50 to-emerald-100';
        if (score >= 60) return 'from-amber-50 to-amber-100';
        return 'from-rose-50 to-rose-100';
    };

    const getProgressColor = (score) => {
        if (score >= 80) return 'stroke-emerald-500';
        if (score >= 60) return 'stroke-amber-500';
        return 'stroke-rose-500';
    };

    const circumference = 2 * Math.PI * 70; // radius = 70
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <Card className="mb-8 shadow-elevated border-0 overflow-hidden">
            <CardContent className="p-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <h3 className="text-3xl font-bold text-slate-900">Match Score</h3>
                        <p className="text-slate-600 text-base leading-relaxed">
                            Overall compatibility between your resume and job requirements
                        </p>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <span className="text-sm font-medium text-slate-600">Candidate Level:</span>
                            <Badge variant="secondary" className="px-3 py-1 text-sm font-semibold">
                                {candidateLevel}
                            </Badge>
                        </div>
                    </div>

                    <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(matchScore)} rounded-full blur-2xl opacity-30`}></div>
                        <div className="relative flex flex-col items-center gap-4">
                            {/* Circular Progress */}
                            <div className="relative w-48 h-48">
                                <svg className="transform -rotate-90 w-48 h-48">
                                    {/* Background circle */}
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="none"
                                        className="text-slate-200"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        className={`${getProgressColor(matchScore)} transition-all duration-1000 ease-out`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                {/* Score text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`text-6xl font-bold ${getScoreColor(matchScore)} transition-all duration-500`}>
                                        {animatedScore}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-slate-500">out of 100</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
