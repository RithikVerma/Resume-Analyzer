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
        return 'text-slate-600';
    };

    return (
        <Card className="mb-8">
            <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <h3 className="text-2xl font-semibold">Match Score</h3>
                        <p className="text-slate-600 text-sm">
                            Overall compatibility between resume and job requirements
                        </p>
                        <div className="flex items-center gap-2 justify-center lg:justify-start">
                            <span className="text-sm text-slate-600">Candidate Level:</span>
                            <Badge variant="secondary">{candidateLevel}</Badge>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className={`text-6xl font-bold ${getScoreColor(matchScore)}`}>
                            {animatedScore}
                        </div>
                        <Progress value={matchScore} className="w-48 h-3" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
