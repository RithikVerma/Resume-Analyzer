import express from 'express';
import { analyzeResume } from '../controllers/analyzeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST /api/analyze - Analyze resume against job description
// Accepts either file upload (resume field) or text in request body
router.post('/analyze', upload.single('resume'), analyzeResume);

export default router;
