import express from 'express';
import { analyzeResume } from '../controllers/analyzeController.js';

const router = express.Router();

// POST /api/analyze - Analyze resume against job description
router.post('/analyze', analyzeResume);

export default router;
