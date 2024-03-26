import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

// Local imports
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import AuthProvider from "./shared/context/auth.tsx";
import HostMachineProvider from "./shared/context/host-machines.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HostMachineProvider>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </HostMachineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
