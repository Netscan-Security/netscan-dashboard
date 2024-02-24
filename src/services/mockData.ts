const hostMachines: HostMachine[] = [
  {
    id: 1,
    name: "Machine 1",
    ipAddress: "192.168.0.1",
    lastScanned: "2024-02-01T04:40:30Z",
    status: "Online",
    machineSpecs: {
      cpu: "Intel Core i5",
      ram: "8",
      os: "Windows 10",
    },
  },
  {
    id: 2,
    name: "Machine 2",
    ipAddress: "192.168.0.2",
    lastScanned: "2024-02-01T09:40:30Z",
    status: "Offline",
    machineSpecs: {
      cpu: "Intel Core i7",
      ram: "16",
      os: "Windows 11",
    },
  },
  {
    id: 3,
    name: "Machine 3",
    ipAddress: "192.168.0.3",
    status: "Online",
    machineSpecs: { cpu: "Intel Core i3", ram: "4", os: "Windows 10" },
  },
];

export { hostMachines };
