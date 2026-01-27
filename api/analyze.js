import { IncomingForm } from 'formidable';
import { extractSkills } from './utils/skillExtractor.js';
import { detectCandidateLevel } from './utils/levelDetector.js';
import { calculateMatchScore } from './utils/scoreCalculator.js';
import {
    generateStrengths,
    generateImprovements,
    generateProjectRecommendations,
    generateSummary
} from './utils/recommendationEngine.js';
import { parseFile } from './utils/fileParser.js';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const form = new IncomingForm({
            uploadDir: '/tmp',
            keepExtensions: true,
            maxFileSize: 10 * 1024 * 1024,
        });

        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const jobDescription = Array.isArray(fields.jobDescription)
            ? fields.jobDescription[0]
            : fields.jobDescription;

        if (!files.resume || !jobDescription) {
            return res.status(400).json({
                error: 'Both resume file and job description are required'
            });
        }

        const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;

        const resumeText = await parseFile(resumeFile);

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                error: 'Could not extract text from resume file'
            });
        }

        const resumeSkills = extractSkills(resumeText);
        const jobSkills = extractSkills(jobDescription);

        const matched = resumeSkills.filter(skill =>
            jobSkills.some(jobSkill =>
                jobSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        const missing = jobSkills.filter(skill =>
            !resumeSkills.some(resumeSkill =>
                resumeSkill.toLowerCase() === skill.toLowerCase()
            )
        ).slice(0, 15);

        const candidateLevel = detectCandidateLevel(resumeText);

        const matchScore = calculateMatchScore(
            matched.length,
            jobSkills.length,
            resumeText,
            jobDescription
        );

        const strengths = generateStrengths(resumeText, matched);
        const improvements = generateImprovements(missing, candidateLevel);
        const projects = generateProjectRecommendations(missing, candidateLevel);
        const summary = generateSummary(matchScore, candidateLevel, matched.length, missing.length);

        const result = {
            candidate_level: candidateLevel,
            match_score: matchScore,
            matched_skills: matched.slice(0, 20),
            missing_skills: missing,
            resume_strengths: strengths,
            resume_improvements: improvements,
            project_recommendations: projects,
            overall_summary: summary
        };

        res.status(200).json(result);

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Failed to analyze resume',
            details: error.message || String(error)
        });
    }
}
