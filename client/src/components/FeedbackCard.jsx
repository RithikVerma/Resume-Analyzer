import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function FeedbackCard({ title, items, icon }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {items.length === 0 ? (
                        <li className="text-slate-500 text-sm italic">No items to display</li>
                    ) : (
                        items.map((item, index) => (
                            <li
                                key={index}
                                className="py-2.5 px-3 bg-slate-50 border-l-2 border-slate-300 rounded text-slate-700 text-sm leading-relaxed"
                            >
                                {item}
                            </li>
                        ))
                    )}
                </ul>
            </CardContent>
        </Card>
    );
}
