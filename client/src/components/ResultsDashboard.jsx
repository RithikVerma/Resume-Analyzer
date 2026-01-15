import ScoreCard from './ScoreCard';
import SkillsCard from './SkillsCard';
import FeedbackCard from './FeedbackCard';
import ProjectCard from './ProjectCard';

export default function ResultsDashboard({ results, onAnalyzeAgain }) {
    if (!results) return null;

    return (
        <section className="animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-white/10">
                <h2 className="text-3xl font-heading font-bold text-gradient mb-4 sm:mb-0">
                    Analysis Results
                </h2>
                <button
                    onClick={onAnalyzeAgain}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary text-gray-100 px-6 py-3 rounded-lg transition-all duration-300"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="1 4 1 10 7 10" />
                        <polyline points="23 20 23 14 17 14" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                    Analyze Another
                </button>
            </div>

            {/* Match Score */}
            <ScoreCard
                matchScore={results.match_score}
                candidateLevel={results.candidate_level}
            />

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <SkillsCard
                    title="Matched Skills"
                    skills={results.matched_skills}
                    type="matched"
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    }
                />
                <SkillsCard
                    title="Missing Skills"
                    skills={results.missing_skills}
                    type="missing"
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    }
                />
            </div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <FeedbackCard
                    title="Resume Strengths"
                    items={results.resume_strengths}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    }
                />
                <FeedbackCard
                    title="Suggested Improvements"
                    items={results.resume_improvements}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    }
                />
            </div>

            {/* Project Recommendations */}
            <div className="mb-8">
                <div className="glass-card p-6 mb-6 flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-light flex-shrink-0">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <div className="flex-1">
                        <h3 className="text-2xl font-heading font-semibold text-gray-100">
                            Recommended Projects
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Practical projects to close skill gaps and enhance your resume
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {results.project_recommendations.length === 0 ? (
                        <div className="text-gray-400 italic col-span-full text-center py-8">
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
            <div className="glass-card p-8 shadow-md">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-light">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <h3 className="text-2xl font-heading font-semibold text-gray-100">
                        Overall Summary
                    </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                    {results.overall_summary}
                </p>
            </div>
        </section>
    );
}
