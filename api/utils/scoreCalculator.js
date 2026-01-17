/**
 * Calculate realistic match score based on multiple factors
 */
export function calculateMatchScore(matchedCount, totalJobSkills, resumeText, jobDescription) {
    // Base score from skill match
    const skillMatchRatio = totalJobSkills > 0 ? matchedCount / totalJobSkills : 0;
    let score = skillMatchRatio * 70; // Skills worth 70% max

    // Bonus for experience indicators
    const experienceKeywords = ['experience', 'years', 'developed', 'led', 'managed', 'implemented'];
    const experienceCount = experienceKeywords.filter(kw =>
        resumeText.toLowerCase().includes(kw)
    ).length;
    score += Math.min(experienceCount * 2, 15); // Up to 15% for experience

    // Bonus for project mentions
    const projectIndicators = ['project', 'built', 'created', 'designed', 'developed'];
    const projectCount = projectIndicators.filter(kw =>
        resumeText.toLowerCase().includes(kw)
    ).length;
    score += Math.min(projectCount * 1.5, 10); // Up to 10% for projects

    // Bonus for education
    if (resumeText.toLowerCase().includes('bachelor') ||
        resumeText.toLowerCase().includes('degree') ||
        resumeText.toLowerCase().includes('university')) {
        score += 5;
    }

    // Cap at 100 and ensure realistic range
    score = Math.min(Math.round(score), 100);

    // Ensure minimum variance (no perfect scores unless truly exceptional)
    if (score > 95 && matchedCount < totalJobSkills) {
        score = 90 + Math.floor(Math.random() * 5);
    }

    return score;
}
