import { useQuery } from "react-query";

// Local imports
import api from "../config/api";
import { API_URL } from "../constants";
import { UserData } from "../types/user";

export const useUsers = () => {
  return useQuery(
    "users",
    async () => {
      const response = await api.get(`${API_URL}/user`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.data as UserData[];
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
