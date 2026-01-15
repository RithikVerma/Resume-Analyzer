/**
 * Detect candidate experience level from resume text
 */
export function detectCandidateLevel(resumeText) {
    if (!resumeText) return 'Fresher';

    const lowerText = resumeText.toLowerCase();

    // Experience indicators
    const seniorIndicators = ['senior', 'lead', 'principal', 'architect', 'manager', 'director', '8+ years', '10+ years'];
    const midIndicators = ['mid-level', '3-5 years', '4-6 years', 'intermediate'];
    const juniorIndicators = ['junior', '1-2 years', 'entry level', 'graduate'];
    const fresherIndicators = ['fresher', 'recent graduate', 'internship', 'no experience'];

    // Count matches
    const seniorCount = seniorIndicators.filter(ind => lowerText.includes(ind)).length;
    const midCount = midIndicators.filter(ind => lowerText.includes(ind)).length;
    const juniorCount = juniorIndicators.filter(ind => lowerText.includes(ind)).length;
    const fresherCount = fresherIndicators.filter(ind => lowerText.includes(ind)).length;

    // Check for year patterns
    const yearMatches = resumeText.match(/(\d+)\+?\s*years?/gi);
    if (yearMatches) {
        const years = parseInt(yearMatches[0]);
        if (years >= 7) return 'Senior';
        if (years >= 3) return 'Mid';
        if (years >= 1) return 'Junior';
    }

    // Determine based on counts
    if (seniorCount > 0) return 'Senior';
    if (midCount > 0) return 'Mid';
    if (juniorCount > 0) return 'Junior';
    if (fresherCount > 0) return 'Fresher';

    // Default based on content length and complexity
    if (resumeText.length > 3000) return 'Mid';
    if (resumeText.length > 1500) return 'Junior';
    return 'Fresher';
}
