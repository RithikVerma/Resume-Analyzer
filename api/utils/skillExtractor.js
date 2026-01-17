/**
 * Extract technical skills from text using pattern matching
 */
export function extractSkills(text) {
    if (!text) return [];

    const skillKeywords = [
        // Programming Languages
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Go', 'Rust',
        'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl',

        // Web Technologies
        'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Next.js', 'Nuxt',
        'HTML', 'CSS', 'SASS', 'SCSS', 'Tailwind', 'Bootstrap', 'jQuery',
        'Webpack', 'Vite', 'Redux', 'MobX', 'GraphQL', 'REST', 'API',

        // Backend & Databases
        'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'SQL',
        'NoSQL', 'Firebase', 'Supabase', 'Django', 'Flask', 'FastAPI',
        'Spring Boot', 'ASP.NET', 'Laravel', 'Rails',

        // Cloud & DevOps
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD',
        'Terraform', 'Ansible', 'Git', 'GitHub', 'GitLab', 'Bitbucket',
        'Linux', 'Unix', 'Nginx', 'Apache',

        // Mobile
        'React Native', 'Flutter', 'iOS', 'Android', 'Xamarin',

        // Data & AI
        'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras',
        'scikit-learn', 'Pandas', 'NumPy', 'Data Science', 'NLP', 'Computer Vision',
        'AI', 'Neural Networks', 'LLM', 'Transformers',

        // Tools & Practices
        'Agile', 'Scrum', 'JIRA', 'Confluence', 'Figma', 'Sketch', 'Adobe XD',
        'Testing', 'Jest', 'Mocha', 'Pytest', 'Selenium', 'Cypress',
        'Microservices', 'Serverless', 'WebSockets', 'OAuth', 'JWT',
        'UI/UX', 'Responsive Design', 'Performance Optimization',

        // Other
        'Blockchain', 'Ethereum', 'Solidity', 'Web3', 'Smart Contracts',
        'IoT', 'Embedded Systems', 'Cybersecurity', 'Penetration Testing'
    ];

    // Helper function to escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const foundSkills = [];
    const lowerText = text.toLowerCase();

    skillKeywords.forEach(skill => {
        const escapedSkill = escapeRegExp(skill.toLowerCase());
        const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
        if (regex.test(lowerText)) {
            foundSkills.push(skill);
        }
    });

    return [...new Set(foundSkills)];
}
