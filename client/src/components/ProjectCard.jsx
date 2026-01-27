import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

export default function ProjectCard({ project }) {
    return (
        <Card className="h-full shadow-card border-slate-200 hover:shadow-elevated hover:-translate-y-1 transition-smooth">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                <CardDescription className="leading-relaxed text-base mt-2">
                    {project.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {project.skills_covered.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1 text-sm font-medium">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
