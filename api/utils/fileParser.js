import path from 'path';
import mammoth from 'mammoth';
import { promises as fs } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

async function parsePDF(filePath) {
    try {
        const buffer = await fs.readFile(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF file: ' + error.message);
    }
}

async function parseDOCX(filePath) {
    try {
        const buffer = await fs.readFile(filePath);
        const result = await mammoth.extractRawText({ buffer: buffer });
        return result.value;
    } catch (error) {
        console.error('Error parsing DOCX:', error);
        throw new Error('Failed to parse DOC/DOCX file: ' + error.message);
    }
}

export async function parseFile(file) {
    const filePath = file.filepath || file.path;
    const filename = file.originalFilename || file.name;
    const ext = path.extname(filename).toLowerCase();

    try {
        switch (ext) {
            case '.pdf':
                return await parsePDF(filePath);
            case '.doc':
            case '.docx':
                return await parseDOCX(filePath);
            default:
                throw new Error('Unsupported file type: ' + ext);
        }
    } finally {
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            console.warn('Could not delete temp file:', unlinkError);
        }
    }
}
