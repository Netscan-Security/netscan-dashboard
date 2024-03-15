import { create } from "apisauce";

// local imports
import { getToken } from "../services/token";
import { API_URL, API_TIMEOUT } from "../constants";

// Create the API client
const api = create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken() ?? ""}`,
  },
});

export default api;
