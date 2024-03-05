import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";

// Local imports
import { DataTable } from "@/components/ui/table/data-table";
import { vulnerabilityMockData } from "@/services/mock-data/vulnerability";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BugIcon } from "lucide-react";

const vulnerabilitiesColumns: ColumnDef<Vulnerability>[] = [
  { header: "ID", accessorKey: "id" },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link
          to={`/vulnerabilities/${row.original.id}`}
          className="text-blue-600"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    header: "Severity",
    accessorKey: "severity",
    cell: ({ row }) => {
      return (
        <span
          className={`flex items-center gap-x-2 w-fit px-2 py-1 text-xs font-semibold rounded-md ${
            row.original.severity === "Critical"
              ? "bg-red-100 text-red-700"
              : row.original.severity === "High"
              ? "bg-orange-100 text-orange-700"
              : row.original.severity === "Medium"
              ? "bg-yellow-200/70 text-yellow-700"
              : "bg-fuchsia-100 text-fuchsia-700"
          }`}
        >
          <BugIcon size={16} />
          {row.original.severity}
        </span>
      );
    },
  },
  {
    header: "Host",
    accessorKey: "host",
    cell: ({ row }) => {
      const hosts = row.original.host.slice(0, 2);
      const remaining = row.original.host.length - 2;
      return (
        <div className="flex items-center gap-2">
          {hosts.map((host) => (
            <Link
              key={host.id}
              to={`/hosts/${host.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {host.name},
            </Link>
          ))}
          {remaining > 0 && (
            <span className="text-sm text-gray-500">+{remaining}</span>
          )}
        </div>
      );
    },
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original.date
            ? new Date(row.original.date).toLocaleDateString()
            : "N/A"}
        </span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-md ${
            row.original.status === "Open"
              ? "bg-red-400/30 text-red-700"
              : "bg-green-400/30 text-green-700"
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
];

const Vulnerabilities = () => {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // mock api call
    setTimeout(() => {
      setVulnerabilities(vulnerabilityMockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Vulnerabilities
          </h1>
          <p className="text-sm">
            View and manage all the vulnerabilities found in your network
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => toast.success("Report Created")}
        >
          Create Report
        </Button>
      </div>
      <DataTable
        headerClassname="bg-neutral-100"
        className="bg-white border"
        columns={vulnerabilitiesColumns}
        data={vulnerabilities}
        loading={isLoading}
      />
    </>
  );
};

export default Vulnerabilities;
