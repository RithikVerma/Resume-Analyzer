export default function Header() {
    return (
        <header className="text-center mb-12 py-8">
            <div className="flex items-center justify-center gap-4 mb-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
                    <path d="M16 8L20 16L16 24L12 16L16 8Z" fill="white" opacity="0.9" />
                    <circle cx="16" cy="16" r="3" fill="white" />
                    <defs>
                        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                            <stop stopColor="#8B5CF6" />
                            <stop offset="1" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                </svg>
                <h1 className="text-4xl font-heading font-bold text-gradient">
                    AI Resume Analyzer
                </h1>
            </div>
            <p className="text-gray-400 text-lg">
                Smart resume matching powered by AI
            </p>
        </header>
    );
}
