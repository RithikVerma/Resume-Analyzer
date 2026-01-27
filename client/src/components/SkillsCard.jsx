import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function SkillsCard({ title, skills, type, icon }) {
    const variant = type === 'matched' ? 'success' : 'warning';

    return (
        <Card className="shadow-card border-slate-200">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-xl">
                    <span className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100">
                            {icon}
                        </div>
                        {title}
                    </span>
                    <Badge variant="secondary" className="px-3 py-1 text-base font-semibold">
                        {skills.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {skills.length === 0 ? (
                        <p className="text-slate-500 text-base italic py-4">No {type} skills found</p>
                    ) : (
                        skills.map((skill, index) => (
                            <Badge
                                key={index}
                                variant={variant}
                                className="px-4 py-2 text-sm font-medium shadow-soft hover:shadow-card transition-smooth"
                            >
                                {skill}
                            </Badge>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
