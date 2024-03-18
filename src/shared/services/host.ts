import { useQuery } from "react-query";

// Local imports
import { API_URL } from "../constants";
import api from "../config/api";

/**
 * Fetches the list of all the hosts from the API.
 * @returns The list of hosts.
 */
export const useHosts = () => {
  return useQuery(
    "hosts",
    async () => {
      const response = await api.get(`${API_URL}/host`);
      if (!response.ok) {
        throw new Error("Failed to fetch hosts");
      }
      return response.data as Host[];
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
