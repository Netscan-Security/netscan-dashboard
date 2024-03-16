import { useContext } from "react";

// Local imports
import { AuthContext, AuthContextProps } from "../context/auth";

export const useAuth = (): AuthContextProps => useContext(AuthContext);
