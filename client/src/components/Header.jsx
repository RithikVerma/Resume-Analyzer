import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, FileText } from 'lucide-react';

export default function Header({ onGetStarted, showLanding = false }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (sectionId) => {
        if (showLanding) {
            // If on landing page, scroll to section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsMobileMenuOpen(false);
            }
        } else {
            // If not on landing page, go back to landing first
            window.location.reload();
            // After reload, it will show landing page and user can navigate
        }
    };

    const navItems = [
        { label: 'Home', id: 'hero' },
        { label: 'Features', id: 'features' },
        { label: 'How It Works', id: 'how-it-works' },
        { label: 'FAQ', id: 'faq' }
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-strong border-b border-slate-200 mb-8">
            <div className="minimal-container py-2">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-900 rounded-md shadow-soft">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                        <h1 className="text-lg font-semibold text-slate-900">
                            AI Resume Analyzer
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-smooth"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <Button onClick={onGetStarted} size="sm">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 transition-smooth"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden mt-4 pt-4 border-t border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="px-4 pt-2">
                            <Button onClick={onGetStarted} className="w-full">
                                Get Started
                            </Button>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
