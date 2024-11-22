import { apiClient } from "./config"

const LEAKS_ENDPOINT = '/leakforms';

export const leakService = {
  // Create a new leak report
  createLeak: async (payload) => {
    try {
      const response = await apiClient.post(`${LEAKS_ENDPOINT}/create`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Create leak error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create leak report');
    }
  },

  // Get all leak reports
  getAllLeaks: async () => {
    try {
      const response = await apiClient.get(`${LEAKS_ENDPOINT}/all`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leak reports');
    }
  },

  // Get a single leak report
  getLeakById: async (leakId) => {
    try {
      const response = await apiClient.get(`${LEAKS_ENDPOINT}/${leakId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leak report');
    }
  },

  // Update leak status
  updateLeakStatus: async (leakId, status) => {
    try {
      const response = await apiClient.patch(`${LEAKS_ENDPOINT}/${leakId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update leak status');
    }
  },

  // Delete leak report
  deleteLeak: async (leakId) => {
    try {
      const response = await apiClient.delete(`${LEAKS_ENDPOINT}/${leakId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete leak report');
    }
  },

  // Get leaks by status (e.g., pending, resolved)
  getLeaksByStatus: async (status) => {
    try {
      const response = await apiClient.get(`${LEAKS_ENDPOINT}/status/${status}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leaks by status');
    }
  },

  // Assign plumber to leak
  assignPlumber: async (leakId, plumberId) => {
    try {
      const response = await apiClient.patch(`${LEAKS_ENDPOINT}/${leakId}/assign`, { plumberId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to assign plumber');
    }
  },

  // New API: Get leaks by user
  getLeaksByUser: async (userId) => {
    try {
      const response = await apiClient.get(`${LEAKS_ENDPOINT}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leaks by user');
    }
  },

  // New API: Get summary of leaks
  getLeakSummary: async () => {
    try {
      const response = await apiClient.get(`${LEAKS_ENDPOINT}/summary`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leak summary');
    }
  }
};

// For backward compatibility if you have existing code using individual exports
export const apiCreateLeak = leakService.createLeak;
export const apiGetAllLeaks = leakService.getAllLeaks;
export const apiGetLeakById = leakService.getLeakById;
export const apiUpdateLeakStatus = leakService.updateLeakStatus;
export const apiDeleteLeak = leakService.deleteLeak;

export default leakService;


