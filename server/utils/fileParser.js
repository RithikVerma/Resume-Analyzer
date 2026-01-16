import path from 'path';
import { createRequire } from 'module';
import mammoth from 'mammoth';

// pdf-parse doesn't have proper ESM support, use createRequire
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

/**
 * Extract text from PDF buffer
 */
async function parsePDF(buffer) {
    try {
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF file');
    }
}

/**
 * Extract text from DOC/DOCX buffer
 */
async function parseDOCX(buffer) {
    try {
        const result = await mammoth.extractRawText({ buffer: buffer });
        return result.value;
    } catch (error) {
        console.error('Error parsing DOCX:', error);
        throw new Error('Failed to parse DOC/DOCX file');
    }
}

/**
 * Parse file based on extension using buffer from memory storage
 */
export async function parseFile(file) {
    const ext = path.extname(file.originalname).toLowerCase();
    const buffer = file.buffer;

    switch (ext) {
        case '.pdf':
            return await parsePDF(buffer);
        case '.doc':
        case '.docx':
            return await parseDOCX(buffer);
        default:
            throw new Error('Unsupported file type');
    }
}
