/**
 * Generate resume strengths, improvements, projects, and summary
 */

export function generateStrengths(resumeText, matchedSkills) {
    const strengths = [];

    if (matchedSkills.length >= 10) {
        strengths.push(`Strong technical skill set with ${matchedSkills.length} matched competencies`);
    } else if (matchedSkills.length >= 5) {
        strengths.push(`Solid foundation with ${matchedSkills.length} relevant technical skills`);
    }

    if (resumeText.toLowerCase().includes('led') || resumeText.toLowerCase().includes('managed')) {
        strengths.push('Demonstrated leadership and team management experience');
    }

    if (resumeText.toLowerCase().includes('project') && resumeText.length > 1000) {
        strengths.push('Well-documented project experience with technical implementations');
    }

    if (/\d+%|\d+x|increased|improved|reduced/i.test(resumeText)) {
        strengths.push('Quantifiable achievements and measurable impact mentioned');
    }

    if (strengths.length === 0) {
        strengths.push('Resume provides relevant background for the position');
        strengths.push('Clear presentation of qualifications and experience');
    }

    return strengths.slice(0, 4);
}

export function generateImprovements(missingSkills, candidateLevel) {
    const improvements = [];

    if (missingSkills.length > 5) {
        improvements.push(`Acquire key missing skills: ${missingSkills.slice(0, 3).join(', ')} to increase job compatibility`);
    }

    improvements.push('Add quantifiable metrics to achievements (e.g., "increased performance by 40%")');

    if (candidateLevel === 'Fresher' || candidateLevel === 'Junior') {
        improvements.push('Highlight relevant coursework, personal projects, and open-source contributions');
    }

    improvements.push('Tailor resume keywords to match job description terminology more closely');

    if (missingSkills.length > 0) {
        improvements.push('Include relevant certifications or online courses for missing technical skills');
    }

    return improvements.slice(0, 4);
}

export function generateProjectRecommendations(missingSkills, candidateLevel) {
    const projects = [];

    // Group skills by category
    const webSkills = missingSkills.filter(s =>
        ['React', 'Angular', 'Vue', 'Node.js', 'Express', 'Next.js'].includes(s)
    );

    const backendSkills = missingSkills.filter(s =>
        ['Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB'].includes(s)
    );

    const cloudSkills = missingSkills.filter(s =>
        ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'].includes(s)
    );

    const aiSkills = missingSkills.filter(s =>
        ['Machine Learning', 'TensorFlow', 'PyTorch', 'NLP', 'AI'].includes(s)
    );

    // Generate relevant projects
    if (webSkills.length > 0) {
        projects.push({
            title: 'Full-Stack E-Commerce Platform',
            description: `Build a complete e-commerce application with user authentication, product catalog, shopping cart, and payment integration using ${webSkills.slice(0, 2).join(' and ')}.`,
            skills_covered: webSkills.slice(0, 3)
        });
    }

    if (backendSkills.length > 0) {
        projects.push({
            title: 'RESTful API & Microservices Architecture',
            description: `Develop a scalable backend system with microservices, database integration, and API documentation using ${backendSkills.slice(0, 2).join(' and ')}.`,
            skills_covered: backendSkills.slice(0, 3)
        });
    }

    if (cloudSkills.length > 0) {
        projects.push({
            title: 'DevOps CI/CD Pipeline',
            description: `Create an automated deployment pipeline with containerization, orchestration, and cloud infrastructure using ${cloudSkills.slice(0, 2).join(' and ')}.`,
            skills_covered: cloudSkills.slice(0, 3)
        });
    }

    if (aiSkills.length > 0) {
        projects.push({
            title: 'Machine Learning Application',
            description: `Build a predictive model or NLP-based application with data preprocessing, model training, and deployment using ${aiSkills.slice(0, 2).join(' and ')}.`,
            skills_covered: aiSkills.slice(0, 3)
        });
    }

    // Default projects if no specific skills matched
    if (projects.length === 0) {
        projects.push({
            title: 'Portfolio Website with Modern Stack',
            description: 'Create a responsive portfolio showcasing your projects with modern web technologies, CI/CD, and cloud hosting.',
            skills_covered: missingSkills.slice(0, 3)
        });

        projects.push({
            title: 'Real-Time Chat Application',
            description: 'Develop a real-time messaging app with WebSockets, user authentication, and database persistence.',
            skills_covered: missingSkills.slice(3, 6)
        });
    }

    return projects.slice(0, 3);
}

export function generateSummary(matchScore, candidateLevel, matchedCount, missingCount) {
    let summary = '';

    if (matchScore >= 80) {
        summary = `Excellent candidate match (${matchScore}%) for this ${candidateLevel}-level position. `;
        summary += `Strong alignment with ${matchedCount} key requirements. `;
        summary += missingCount > 0
            ? `${missingCount} skill gap(s) identified - can be addressed through targeted learning or minor upskilling.`
            : 'Comprehensive skill coverage meets all job requirements.';
    } else if (matchScore >= 60) {
        summary = `Good candidate match (${matchScore}%) for this ${candidateLevel}-level position. `;
        summary += `Demonstrates ${matchedCount} relevant competencies with room for growth. `;
        summary += `Focus on acquiring ${missingCount} missing skill(s) to increase competitiveness.`;
    } else if (matchScore >= 40) {
        summary = `Moderate candidate match (${matchScore}%) for this ${candidateLevel}-level position. `;
        summary += `Shows potential with ${matchedCount} matching skills. `;
        summary += `Significant skill gap of ${missingCount} areas - recommend targeted learning and project-based experience.`;
    } else {
        summary = `Limited match (${matchScore}%) for this specific role. `;
        summary += `Current skill set (${matchedCount} matches) requires substantial development. `;
        summary += `Consider entry-level positions or intensive upskilling in ${missingCount} key areas before applying.`;
    }

    return summary;
}
