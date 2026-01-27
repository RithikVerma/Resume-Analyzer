import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function FeedbackCard({ title, items, icon }) {
    return (
        <Card className="shadow-card border-slate-200">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-slate-100">
                        {icon}
                    </div>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {items.length === 0 ? (
                        <li className="text-slate-500 text-base italic py-2">No items to display</li>
                    ) : (
                        items.map((item, index) => (
                            <li
                                key={index}
                                className="py-3 px-4 bg-slate-50 border-l-4 border-blue-400 rounded-r-lg text-slate-700 text-base leading-relaxed shadow-soft transition-smooth hover:shadow-card hover:bg-blue-50/50"
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
