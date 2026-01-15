export default function ProjectCard({ project }) {
    return (
        <div className="glass-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
            <h4 className="text-xl font-heading font-semibold text-primary-light mb-2">
                {project.title}
            </h4>
            <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
                {project.skills_covered.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-primary/15 text-primary-light border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}
