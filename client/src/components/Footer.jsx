import { FileText, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        about: [
            { label: 'About Us', href: '#' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' }
        ],
        quickLinks: [
            { label: 'Features', href: '#features' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Contact', href: '#' },
            { label: 'Support', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' }
    ];

    return (
        <footer className="bg-slate-900 text-slate-300 mt-32">
            <div className="minimal-container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white rounded-lg">
                                <FileText className="h-5 w-5 text-slate-900" />
                            </div>
                            <span className="text-xl font-semibold text-white">
                                AI Resume Analyzer
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-6 max-w-md">
                            Optimize your resume with AI-powered analysis. Get instant feedback and improve your chances of landing your dream job.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* About Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">About</h3>
                        <ul className="space-y-3">
                            {footerLinks.about.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400">
                            © {currentYear} AI Resume Analyzer. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="hover:text-white transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Terms
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
