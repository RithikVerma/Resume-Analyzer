export default function SkillsCard({ title, skills, type, icon }) {
    const tagClass = type === 'matched' ? 'skill-tag-matched' : 'skill-tag-missing';

    return (
        <div className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-primary-light">
                    {icon}
                    <h3 className="text-xl font-heading font-semibold text-gray-100">{title}</h3>
                </div>
                <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-lg text-sm font-semibold">
                    {skills.length}
                </span>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
                {skills.length === 0 ? (
                    <p className="text-gray-400 italic py-4">No {type} skills found</p>
                ) : (
                    skills.map((skill, index) => (
                        <span key={index} className={tagClass}>
                            {skill}
                        </span>
                    ))
                )}
            </div>
        </div>
    );
}
