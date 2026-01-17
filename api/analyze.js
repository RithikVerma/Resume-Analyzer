import multiparty from 'multiparty';
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

/**
 * Vercel Serverless Function for Resume Analysis
 * Handles both file uploads and text-based resume analysis
 */
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let resumeText = '';
        let jobDescription = '';

        // Detect if it's a multipart form (file upload) or JSON
        const contentType = req.headers['content-type'] || '';

        if (contentType.includes('multipart/form-data')) {
            // Handle file upload using multiparty
            const form = new multiparty.Form();

            const parseFormData = () => {
                return new Promise((resolve, reject) => {
                    form.parse(req, async (err, fields, files) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ fields, files });
                    });
                });
            };

            const { fields, files } = await parseFormData();

            // Extract job description from fields
            jobDescription = fields.jobDescription ? fields.jobDescription[0] : '';

            // Process uploaded file if exists
            if (files.resume && files.resume[0]) {
                const file = files.resume[0];

                // Read file buffer
                const fs = await import('fs/promises');
                const buffer = await fs.readFile(file.path);

                // Create file object similar to multer format
                const fileObj = {
                    originalname: file.originalFilename,
                    buffer: buffer
                };

                resumeText = await parseFile(fileObj);

                // Clean up temp file
                await fs.unlink(file.path);
            }
        } else {
            // Handle JSON request body
            const body = req.body;
            resumeText = body.resumeText || '';
            jobDescription = body.jobDescription || '';
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

        res.status(200).json(result);

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            error: 'Failed to analyze resume',
            details: error.message
        });
    }
}
