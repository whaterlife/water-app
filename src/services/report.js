import { apiClient } from "./config"
const REPORTS_ENDPOINT = '/reports';

export const reportService = {
  createReport: async (payload) => {
    try {
      const response = await apiClient.post(`${REPORTS_ENDPOINT}/create`, payload);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create report');
    }
  },

  getAllReports: async () => {
    try {
      const response = await apiClient.get(`${REPORTS_ENDPOINT}/gets`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reports');
    }
  },
  getReportById: async (reportId) => {
    try {
      const response = await apiClient.get(`${REPORTS_ENDPOINT}/${reportId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch report');
    }
  },
  updateReport: async (reportId, payload) => {
    try {
      const response = await apiClient.patch(`${REPORTS_ENDPOINT}/${reportId}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update report');
    }
  },
  deleteReport: async (reportId) => {
    try {
      const response = await apiClient.delete(`${REPORTS_ENDPOINT}/${reportId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete report');
    }
  }
};

export default reportService;

