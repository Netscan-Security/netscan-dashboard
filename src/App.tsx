import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Local imports
import Root from "./layouts/root";
import SignInPage from "./pages/sign-in";
import Host from "./pages/authenticated/host";
import { Users } from "./pages/authenticated/users";
import Targets from "./pages/authenticated/targets";
import Hosts from "./pages/authenticated/host/hosts";
import ErrorPage from "./components/templates/error";
import Dashboard from "./pages/authenticated/dashboard";
import NotFoundPage from "./components/templates/not-found";
import Vulnerabilities from "./pages/authenticated/vulnerabilities";
import VulnerabilityPage from "./pages/authenticated/vulnerabilities/vulnerability";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/users",
          element: <Users />,
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
          path: "/hosts/:id",
          element: <Host />,
        },
        {
          path: "/vulnerabilities",
          element: <Vulnerabilities />,
        },
        {
          path: "/vulnerabilities/:vulnerabilityId",
          element: <VulnerabilityPage />,
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
