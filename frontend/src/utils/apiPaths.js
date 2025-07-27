export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// utils/API_PATHS.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login", // Admin login (JWT auth)
    },

    FEEDBACK: {
        GET_ALL_FEEDBACKS: "/api/feedback", // admin only
        GET_ALL_FEEDBACKS_SUMMARY: "/api/feedback/summary", // admin only
        GET_FEEDBACK_BY_ID: (id) => `/api/feedback/${id}`, // admin only
        CREATE_FEEDBACK: "/api/feedback", // public
        DELETE_FEEDBACK: (id) => `/api/feedback/${id}`, // admin only
    },
};
