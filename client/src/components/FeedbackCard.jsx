export default function FeedbackCard({ title, items, icon }) {
    return (
        <div className="glass-card p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                <div className="text-primary-light">{icon}</div>
                <h3 className="text-xl font-heading font-semibold text-gray-100">{title}</h3>
            </div>

            {/* List */}
            <ul className="space-y-2">
                {items.length === 0 ? (
                    <li className="text-gray-400 italic py-4">No items to display</li>
                ) : (
                    items.map((item, index) => (
                        <li
                            key={index}
                            className="py-3 px-4 bg-white/3 border-l-4 border-primary rounded-lg text-gray-300 leading-relaxed transition-all duration-300 hover:bg-white/5 hover:translate-x-1"
                        >
                            {item}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
