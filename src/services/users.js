import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    try {
        const formData = new FormData();
        
        // Append all fields to FormData
        Object.keys(payload).forEach(key => {
            // Special handling for photo file
            if (key === 'photo' && payload[key] instanceof File) {
                formData.append('photo', payload[key]);
            } else {
                formData.append(key, payload[key]);
            }
        });

        const response = await apiClient.post('/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file upload
            },
        });
        return response.data;
    } catch (error) {
        console.error('Signup error details:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const apiLogin = async (payload) => {
    try {
        const response = await apiClient.post("/users/login", payload);
        if (response.data && response.data.accessToken) {
            localStorage.setItem("userToken", response.data.accessToken);

            const profileResponse = await apiClient.get("/users/me");
            if (profileResponse.data) {
                localStorage.setItem("profileData", JSON.stringify(profileResponse.data));
            }
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        localStorage.removeItem("userToken");
        localStorage.removeItem("profileData");
        throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
};

export const getProfile = async () => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("No token found");
        }

        const response = await apiClient.get("/users/me");
        return response.data;
    } catch (error) {
        console.error("Profile fetch error:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
};