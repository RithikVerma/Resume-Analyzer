import { FileText, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: 'Features', href: '#features' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'FAQ', href: '#faq' }
        ],
        company: [
            { label: 'About Us', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Support', href: '#' }
        ],
        legal: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Mail, href: 'mailto:contact@airesume.com', label: 'Email' }
    ];

    return (
        <footer className="bg-slate-50 border-t border-slate-200 mt-32">
            <div className="minimal-container py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 bg-blue-600 rounded-xl shadow-sm">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-slate-900">
                                AI Resume Analyzer
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-6 max-w-sm leading-relaxed">
                            Optimize your resume with AI-powered analysis. Get instant feedback and actionable insights to improve your chances of landing your dream job.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wide">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wide">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">
                            © {currentYear} AI Resume Analyzer. All rights reserved.
                        </p>
                        <p className="text-sm text-slate-500">
                            Made with ❤️ for job seekers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
