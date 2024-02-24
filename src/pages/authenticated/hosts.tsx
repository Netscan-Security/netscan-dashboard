import React from "react";
import { ColumnDef } from "@tanstack/react-table";

// Local imports
import { DataTable } from "@/components/ui/table/data-table";

interface HostMachine {
  id: number;
  name: string;
  ipAddress: string;
  status: string;
  lastScanned?: string;
}

const hostMachines: HostMachine[] = [
  {
    id: 1,
    name: "Machine 1",
    ipAddress: "192.168.0.1",
    lastScanned: "2024-02-01T04:40:30Z",
    status: "Online",
  },
  {
    id: 2,
    name: "Machine 2",
    ipAddress: "192.168.0.2",
    lastScanned: "2024-02-01T09:40:30Z",
    status: "Offline",
  },
  { id: 3, name: "Machine 3", ipAddress: "192.168.0.3", status: "Online" },
];

const columns: ColumnDef<HostMachine>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "IP Address", accessorKey: "ipAddress" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold text-white rounded-md ${
            row.original.status === "Online" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    header: "Last Scanned",
    accessorKey: "lastScanned",
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original.lastScanned
            ? new Date(row.original.lastScanned).toLocaleString()
            : "N/A"}
        </span>
      );
    },
  },
];

const Hosts: React.FC = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={hostMachines.map((machine) => ({
          id: machine.id,
          name: machine.name,
          ipAddress: machine.ipAddress,
          lastScanned: machine.lastScanned,
          status: machine.status,
        }))}
      />
    </div>
  );
};

export default Hosts;
