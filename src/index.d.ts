interface Pagination {
  page: number | undefined;
  pageSize: number | undefined;
  total: number | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  fetching: boolean;
}

type Host = {
  id: string;
  name: string;
  userId: string;
  adminId: string;
  roomId: string;
  cpu: string;
  memory: string;
  gpu: string;
  hardDisk: string;
  os: string;
  rawInfo: string;
  model: string;
  ipAddress: string;
  createdAt: string;
  updatedAt: string;
  onboardingStage: string;
  vpnConfig: string | null;
  status: "offline" | "online";
};

type HostMachine = {
  id: number;
  name: string;
  ipAddress: string;
  status: string;
  lastScanned?: string;
  machineSpecs?: {
    cpu: string;
    ram: string;
    os: string;
  };
  scanInfo?: {
    running: boolean;
    total: number;
    vulnerabilities: number;
    targets: number;
  };
};

type Vulnerability = {
  id: number;
  name: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  host: {
    id: number;
    name: string;
  }[];
  date: string;
  status: string;
  details?: string;
};
