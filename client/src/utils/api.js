import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function analyzeResume(resumeFile, jobDescription) {
    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('jobDescription', jobDescription);

        const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.details || error.response?.data?.error || 'Failed to analyze resume');
    }
}
