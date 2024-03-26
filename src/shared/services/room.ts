import { useQuery } from "react-query";

// Local imports
import api from "../config/api";
import { API_URL } from "../constants";

export const useRooms = () => {
  return useQuery("rooms", async () => {
    const response = await api.get(`${API_URL}/rooms`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.data;
  });
};
