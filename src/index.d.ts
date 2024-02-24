interface Pagination {
  page: number | undefined;
  pageSize: number | undefined;
  total: number | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  fetching: boolean;
}

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
};
