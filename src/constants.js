// API base URL
export const API_BASE_URL = "http://localhost:3001/api/v1";

// Triggering auto login
export const AUTO_LOGIN_ACTION_TYPE = "@@AUTO_LOGIN";
export const AUTO_LOGIN_ACTION = { type: AUTO_LOGIN_ACTION_TYPE };

// Notification type
export const ERROR_NOTIFICATION_TYPE = "error";

// Default notification expiration in miliseconds
export const DEFAULT_NOTIFICATION_EXPIRATION_IN_MS = 5000; // 5 seconds

// The page is not found
export const NOT_FOUND_ERROR_TYPE = "not_found";
// The page access is not authorized without prior login
export const UNAUTHORIZED_ERROR_TYPE = "unauthorized";
