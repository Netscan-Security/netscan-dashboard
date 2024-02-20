import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Local imports
import Homepage from "./pages/homepage";
import SignInPage from "./pages/sign-in";
import Sidebar from "./layouts/side-bar";

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
