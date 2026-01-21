import { extractSkills } from '../utils/skillExtractor.js';
import { detectCandidateLevel } from '../utils/levelDetector.js';
import { calculateMatchScore } from '../utils/scoreCalculator.js';
import {
    generateStrengths,
    generateImprovements,
    generateProjectRecommendations,
    generateSummary
} from '../utils/recommendationEngine.js';
import { parseFile } from '../utils/fileParser.js';

export async function analyzeResume(req, res) {
    try {
        let resumeText = req.body.resumeText;
        const { jobDescription } = req.body;

        // If a file was uploaded, extract text from it (memory storage)
        if (req.file) {
            resumeText = await parseFile(req.file);
        }

        // Validation
        if (!resumeText || !jobDescription) {
            return res.status(400).json({
                error: 'Both resume and job description are required'
            });
        }

        // Extract skills from both texts
        const resumeSkills = extractSkills(resumeText);
        const jobSkills = extractSkills(jobDescription);

        // Find matched and missing skills
        const matched = resumeSkills.filter(skill =>
            jobSkills.some(jobSkill =>
                jobSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        const missing = jobSkills.filter(skill =>
            !resumeSkills.some(resumeSkill =>
                resumeSkill.toLowerCase() === skill.toLowerCase()
            )
        ).slice(0, 15); // Limit to top 15 missing skills

        // Detect candidate level
        const candidateLevel = detectCandidateLevel(resumeText);

        // Calculate match score
        const matchScore = calculateMatchScore(
            matched.length,
            jobSkills.length,
            resumeText,
            jobDescription
        );

        // Generate feedback
        const strengths = generateStrengths(resumeText, matched);
        const improvements = generateImprovements(missing, candidateLevel);
        const projects = generateProjectRecommendations(missing, candidateLevel);
        const summary = generateSummary(matchScore, candidateLevel, matched.length, missing.length);

        // Return analysis results
        const result = {
            candidate_level: candidateLevel,
            match_score: matchScore,
            matched_skills: matched.slice(0, 20), // Top 20
            missing_skills: missing,
            resume_strengths: strengths,
            resume_improvements: improvements,
            project_recommendations: projects,
            overall_summary: summary
        };

        res.json(result);

    } catch (error) {
        console.error('Analysis error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            error: 'Failed to analyze resume',
            details: error.message
        });
    }
}
