import React from "react";
import type { ColumnDef } from "@tanstack/react-table";

// Local imports
import { DataTable } from "@/components/ui/table/data-table";
import { Link } from "react-router-dom";
import { hostMachines } from "@/services/mockData";

const columns: ColumnDef<HostMachine>[] = [
  { header: "ID", accessorKey: "id" },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link to={`/hosts/${row.original.id}`} className="text-blue-600">
          {row.original.name}
        </Link>
      );
    },
  },
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
    <>
      <div className="mb-4">
        <h1 className="text-4xl font-semibold">Hosts</h1>
        <p className="text-lg">
          The agents that are installed in different machines
        </p>
      </div>
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
    </>
  );
};

export default Hosts;
