import React from "react";
import ReactDOM from "react-dom/client";

// Local imports
import "./index.css";
import App from "./App.tsx";
import HostMachineProvider from "./services/context/host-machines.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HostMachineProvider>
      <App />
      <Toaster />
    </HostMachineProvider>
  </React.StrictMode>
);
