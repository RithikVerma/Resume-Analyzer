import ScoreCard from './ScoreCard';
import SkillsCard from './SkillsCard';
import FeedbackCard from './FeedbackCard';
import ProjectCard from './ProjectCard';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { RefreshCw, CheckCircle2, AlertCircle, Star, Lightbulb, BookOpen } from 'lucide-react';

export default function ResultsDashboard({ results, onAnalyzeAgain }) {
    if (!results) return null;

    return (
        <section className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
                <h2 className="text-3xl font-semibold text-slate-900">
                    Analysis Results
                </h2>
                <Button onClick={onAnalyzeAgain} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                    Analyze Another
                </Button>
            </div>

            {/* Match Score */}
            <ScoreCard
                matchScore={results.match_score}
                candidateLevel={results.candidate_level}
            />

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkillsCard
                    title="Matched Skills"
                    skills={results.matched_skills}
                    type="matched"
                    icon={<CheckCircle2 className="h-5 w-5" />}
                />
                <SkillsCard
                    title="Missing Skills"
                    skills={results.missing_skills}
                    type="missing"
                    icon={<AlertCircle className="h-5 w-5" />}
                />
            </div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FeedbackCard
                    title="Resume Strengths"
                    items={results.resume_strengths}
                    icon={<Star className="h-5 w-5" />}
                />
                <FeedbackCard
                    title="Suggested Improvements"
                    items={results.resume_improvements}
                    icon={<Lightbulb className="h-5 w-5" />}
                />
            </div>

            {/* Project Recommendations */}
            <div>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Recommended Projects
                        </CardTitle>
                        <CardDescription>
                            Practical projects to close skill gaps and enhance your resume
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {results.project_recommendations.length === 0 ? (
                        <div className="text-slate-500 text-sm italic col-span-full text-center py-8">
                            No project recommendations available
                        </div>
                    ) : (
                        results.project_recommendations.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))
                    )}
                </div>
            </div>

            {/* Overall Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-700 leading-relaxed">
                        {results.overall_summary}
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}
