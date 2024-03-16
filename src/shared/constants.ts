// Token constants
export const TOKEN_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const TOKEN_KEY = "userToken";

// API constants
export const API_URL =
  import.meta.env.VITE_DEV_API_URL || "http://localhost:3000";
export const API_TIMEOUT = 30000;
