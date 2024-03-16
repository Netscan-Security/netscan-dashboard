import { PropsWithChildren, createContext, useEffect, useState } from "react";

// Local imports
import api from "../config/api";
import { API_URL } from "../constants";
import { User, UserData } from "../types/user";
import PageLoader from "@/components/templates/page-loader";
import { getToken, removeToken, saveToken } from "../services/token";

const LOGIN_ENDPOINT = "/auth/login";
const USERDATA_ENDPOINT = "/profile";

export interface AuthContextProps {
  user: UserData | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
    remember30Days: boolean
  ) => Promise<void>;
  logout: () => void;
}

// Create the auth context
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

// Create a custom hook to access the auth useContext

const getUserData = async (token: string) => {
  const response = await api.get(
    `${API_URL}${USERDATA_ENDPOINT}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.data as UserData;
};

// Create the AuthProvider component
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUserData(token).then((userData) => {
        setUser(userData);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Logs in the user with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<void>} - A promise that resolves once the login is successful.
   */
  const login = async (
    email: string,
    password: string,
    remember30Days: boolean
  ): Promise<void> => {
    const response = await api.post(`${API_URL}${LOGIN_ENDPOINT}`, {
      email,
      password,
    });

    if (!response.ok) {
      console.error(response.originalError?.message);
      throw new Error("Login failed");
    }

    // Once the login is successful, update the user state
    console.log(
      (response.data as User).user ||
        (await getUserData((response.data as User).access_token))
    );
    setUser(
      (response.data as User).user ||
        (await getUserData((response.data as User).access_token))
    );
    saveToken(
      (response.data as User).access_token,
      remember30Days ? "2592000000" : undefined
    );
  };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  const authContextValue: AuthContextProps = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
