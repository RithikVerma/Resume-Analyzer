import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export async function analyzeResume(resumeData, jobDescription, inputMode) {
    try {
        let response;

        if (inputMode === 'file') {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('resume', resumeData);
            formData.append('jobDescription', jobDescription);

            response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            // Send as JSON for text input
            response = await axios.post(`${API_BASE_URL}/analyze`, {
                resumeText: resumeData,
                jobDescription
            });
        }

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.error || 'Failed to analyze resume');
    }
}
