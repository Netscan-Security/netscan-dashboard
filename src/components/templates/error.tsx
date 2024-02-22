import { RefreshCcw } from "lucide-react";
import { useRouteError, useNavigate } from "react-router-dom";

// Local imports
import { Button } from "../ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-5 font-bold text-yellow-600 text-9xl">Oops!</h1>
        <p className="text-xl text-gray-700 mb-7">Something went wrong.</p>
        <Button
          className="text-yellow-700 bg-yellow-400/40 hover:bg-yellow-400"
          onClick={() => navigate(window.location.pathname)}
        >
          Retry
          <RefreshCcw size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
