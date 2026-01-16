import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function SkillsCard({ title, skills, type, icon }) {
    const variant = type === 'matched' ? 'success' : 'warning';

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        {icon}
                        {title}
                    </span>
                    <Badge variant="secondary">{skills.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {skills.length === 0 ? (
                        <p className="text-slate-500 text-sm italic py-2">No {type} skills found</p>
                    ) : (
                        skills.map((skill, index) => (
                            <Badge key={index} variant={variant}>
                                {skill}
                            </Badge>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
