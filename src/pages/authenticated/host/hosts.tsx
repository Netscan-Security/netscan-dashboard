import { useState } from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";

// Local imports
import AddNewMachine from "./new-machine-form";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { useHostMachines } from "@/shared/context/host-machines";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
          className={`px-2 py-1 text-xs font-semibold rounded-md ${
            row.original.status === "Online"
              ? "bg-green-400/30 text-green-700"
              : "bg-red-400/30 text-red-700"
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
  {
    header: "Scan Status",
    accessorKey: "scanStatus",
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original?.scanInfo?.running ? "Running" : "Idle"}
        </span>
      );
    },
  },
];

const Hosts: React.FC = () => {
  const { hostMachinesInfo } = useHostMachines();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-semibold">Hosts</h1>
          <p className="text-lg">
            The agents that are installed in different machines
          </p>
        </div>
        <Dialog open={openModal} onOpenChange={(open) => setOpenModal(open)}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => setOpenModal(true)}>
              Add Host
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddNewMachine closeModal={() => setOpenModal(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {hostMachinesInfo && (
        <DataTable
          columns={columns}
          data={hostMachinesInfo.map((machine) => ({
            id: machine.id,
            name: machine.name,
            ipAddress: machine.ipAddress,
            lastScanned: machine.lastScanned,
            status: machine.status,
          }))}
        />
      )}
    </>
  );
};

export default Hosts;
