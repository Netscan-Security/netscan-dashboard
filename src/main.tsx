import React from "react";
import ReactDOM from "react-dom/client";

// Local imports
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import AuthProvider from "./shared/context/auth.tsx";
import HostMachineProvider from "./shared/context/host-machines.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HostMachineProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </HostMachineProvider>
  </React.StrictMode>
);
