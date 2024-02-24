import React from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";

// Local imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { hostMachines } from "@/services/mockData";
import { DataTable } from "@/components/ui/table/data-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-semibold">Hosts</h1>
          <p className="text-lg">
            The agents that are installed in different machines
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Add Host</Button>
          </DialogTrigger>
          <DialogContent>
            <AddNewMachine />
          </DialogContent>
        </Dialog>
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

const AddNewMachine = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Add Host</h1>
        <form className="space-y-3">
          <div>
            <label className="block text-sm font-semibold" htmlFor="name">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              // className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold" htmlFor="ipAddress">
              IP Address
            </label>
            <Input
              type="text"
              id="ipAddress"
              name="ipAddress"
              // className="border-gray-300 rounded-md w- full focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </form>
      </div>
      <DialogFooter>
        <Button variant="default">Add</Button>
      </DialogFooter>
    </>
  );
};

export default Hosts;
