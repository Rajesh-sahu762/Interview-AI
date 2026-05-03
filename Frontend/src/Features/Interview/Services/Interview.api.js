import createAxiosInstance from "../../../Services/axiosConfig";

const api = createAxiosInstance("http://localhost:5000/api/interview");

export async function generateInterviewReport(formData) {
    try {
        const response = await api.post("/generate", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }catch (error) {
        console.error("Generate Interview Report error:", error);
        throw error;
    }
}

export async function getInterviewReport(reportId) {
    try {
        const response = await api.get(`/reports/${reportId}`);
        return response.data;
    }catch (error) {
        console.error("Get Interview Report error:", error);
        throw error;
    }
}

export async function getAllInterviewReports() {
    try {
        const response = await api.get(`/`);
        return response.data;
    }catch (error) {
        console.error("Get All Interview Reports error:", error);
        throw error;
    }
}
