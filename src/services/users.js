import { apiClient } from "./config"

export const apiSignup = async (formData) => {
    try {
        const response = await fetch('https://water-api-329b.onrender.com/users/register', {
            method: 'POST',
            body: formData, // Send formData directly, don't JSON.stringify
            // Don't set Content-Type header, let the browser set it with the boundary
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
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