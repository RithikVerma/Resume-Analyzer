import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export async function analyzeResume(resumeText, jobDescription) {
    try {
        const response = await axios.post(`${API_BASE_URL}/analyze`, {
            resumeText,
            jobDescription
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.error || 'Failed to analyze resume');
    }
}
