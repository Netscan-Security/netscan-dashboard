import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Local imports
import Homepage from "./pages/homepage";
import SignInPage from "./pages/sign-in";
import Sidebar from "./layouts/side-bar";
import Targets from "./pages/authenticated/targets";
import Vulnerabilities from "./pages/authenticated/vulnerabilities";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/targets",
          element: <Targets />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
