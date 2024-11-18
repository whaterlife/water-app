import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    try {
        const response = await apiClient.post('/users/register', payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const apiLogin = async (payload) => {
    try {
        const response = await apiClient.post("/users/login", payload);
        if (response.data && response.data.token) {
            localStorage.setItem("userToken", response.data.token);

            const profileResponse = await apiClient.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            });

            localStorage.setItem("profileData", JSON.stringify(profileResponse.data));
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
};

export const getProfile = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
        console.error("No token found");
        return null;
    }

    try {
        const response = await apiClient.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Profile fetch error:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
};

// src/utils/storeToken.js
export const storeAccessToken = () => {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc5ODk1NDQwOTIyOWY1NWE4ZjYxZCIsImlhdCI6MTczMTc1NDE3MCwiZXhwIjoxNzMxODQwNTcwfQ.ZqNQ7bB8VaWsqzpOUnG4nC191J2l09PV-j05fPdAj6M";
  localStorage.setItem("userToken", accessToken);
};

// Call this function once to store the token
storeAccessToken();


 