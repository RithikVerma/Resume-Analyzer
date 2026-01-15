import { useEffect, useState } from 'react';

export default function ScoreCard({ matchScore, candidateLevel }) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        // Animate score from 0 to matchScore
        let current = 0;
        const increment = matchScore / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= matchScore) {
                current = matchScore;
                clearInterval(timer);
            }
            setAnimatedScore(Math.round(current));
        }, 30);

        return () => clearInterval(timer);
    }, [matchScore]);

    // Calculate circle progress
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (matchScore / 100) * circumference;

    return (
        <div className="glass-card p-8 mb-8 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Score Details */}
                <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl font-heading mb-2">Match Score</h3>
                    <p className="text-gray-400 mb-6">
                        Overall compatibility between resume and job requirements
                    </p>
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <span className="text-gray-300 font-medium">Candidate Level:</span>
                        <span className="bg-gradient-to-br from-primary to-secondary text-white px-4 py-2 rounded-lg font-semibold text-sm">
                            {candidateLevel}
                        </span>
                    </div>
                </div>

                {/* Circular Progress */}
                <div className="relative flex-shrink-0">
                    <svg className="transform -rotate-90" width="160" height="160">
                        {/* Background Circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="8"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#score-gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="text-5xl font-bold text-gradient">
                            {animatedScore}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
