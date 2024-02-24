import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Local imports
import SignInPage from "./pages/sign-in";
import Sidebar from "./layouts/side-bar";
import Targets from "./pages/authenticated/targets";
import ErrorPage from "./components/templates/error";
import Dashboard from "./pages/authenticated/dashboard";
import NotFoundPage from "./components/templates/not-found";
import Vulnerabilities from "./pages/authenticated/vulnerabilities";
import Hosts from "./pages/authenticated/hosts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/targets",
          element: <Targets />,
        },
        {
          path: "/hosts",
          element: <Hosts />,
        },
        {
          path: "/vulnerabilities",
          element: <Vulnerabilities />,
        },
      ],
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
