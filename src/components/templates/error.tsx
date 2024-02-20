import { ArrowLeft, XCircle } from "lucide-react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="p-1 mx-auto bg-red-100 rounded-md w-fit">
          <XCircle size={32} className="text-red-500" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-red-500">Oops!</h1>
        <p className="mb-8 text-lg text-gray-700">Something went wrong.</p>
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              navigate("/", {
                replace: true,
              })
            }
          >
            Take me home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
