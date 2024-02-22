import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="mb-5 font-bold text-gray-600 text-9xl">404</h1>
      <p className="text-xl text-gray-700 mb-7">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 text-blue-700 rounded bg-blue-400/40 hover:bg-blue-400"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
