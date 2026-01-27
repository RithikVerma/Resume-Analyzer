import path from 'path';
import mammoth from 'mammoth';
import { promises as fs } from 'fs';
import { PDFExtract } from 'pdf.js-extract';

const pdfExtract = new PDFExtract();

/**
 * Extract text from PDF buffer using pdf.js-extract
 */
async function parsePDF(filePath) {
    try {
        const data = await pdfExtract.extract(filePath);
        const text = data.pages.map(page =>
            page.content.map(item => item.str).join(' ')
        ).join('\n');
        return text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF file: ' + error.message);
    }
}

/**
 * Extract text from DOC/DOCX buffer
 */
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

/**
 * Parse file based on extension
 */
export async function parseFile(file) {
    const filePath = file.filepath || file.path;
    const filename = file.originalFilename || file.name;
    const ext = path.extname(filename).toLowerCase();

    console.log('Parsing file:', filename, 'Extension:', ext, 'Path:', filePath);

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
        // Clean up temp file
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            console.warn('Could not delete temp file:', unlinkError);
        }
    }
}
