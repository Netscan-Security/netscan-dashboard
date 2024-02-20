import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">404</h1>
      <p className="mb-8 text-lg text-gray-600">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
