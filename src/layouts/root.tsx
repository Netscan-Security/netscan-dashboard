import { Navigate } from "react-router-dom";

// Local imports
import { useAuth } from "@/shared/hooks/use-auth";

// Local imports
import Sidebar from "./side-bar";

const Root = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/sign-in" />;

  return <Sidebar />;
};

export default Root;
