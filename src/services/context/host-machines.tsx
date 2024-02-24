import React, { createContext, useContext, useState } from "react";

import { hostMachines } from "../mockData";

// Define the host machine context
interface HostMachineContextType {
  hostMachinesInfo: HostMachine[] | null;
  setHostMachinesInfo: React.Dispatch<
    React.SetStateAction<HostMachine[] | null>
  >;
}

// Create the host machine context
const HostMachineContext = createContext<HostMachineContextType>({
  hostMachinesInfo: null,
  setHostMachinesInfo: () => {},
});

// Create a host machine context provider component
const HostMachineProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [hostMachinesInfo, setHostMachinesInfo] = useState<
    HostMachine[] | null
  >(hostMachines);

  return (
    <HostMachineContext.Provider
      value={{ hostMachinesInfo, setHostMachinesInfo }}
    >
      {children}
    </HostMachineContext.Provider>
  );
};

export default HostMachineProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useHostMachines = () => useContext(HostMachineContext);
