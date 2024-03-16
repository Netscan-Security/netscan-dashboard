import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

// Local imports
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { UserData } from "@/shared/types/user";

const usersColumns: ColumnDef<Omit<UserData, "imageUrl" | "role">>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Contact Number",
    accessorKey: "contactNumber",
  },
  {
    header: "Has Host",
    accessorKey: "hasHost",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-md ${
            row.original.hasHost
              ? "bg-green-400/30 text-green-700"
              : "bg-red-400/30 text-red-700"
          }`}
        >
          {row.original.hasHost ? "Yes" : "No"}
        </span>
      );
    },
  },
];

export const Users = () => {
  const [users] = useState<Omit<UserData, "imageUrl" | "role">[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      username: "john_doe",
      email: "john_doe@mail.com",
      contactNumber: "1234567890",
      hasHost: true,
    },
  ]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-semibold">Users</h1>
        <Button
          onClick={() => {
            // Open the dialog
          }}
        >
          Add New User
        </Button>
      </div>
      <DataTable
        headerClassname="bg-neutral-100"
        className="bg-white border"
        columns={usersColumns}
        data={users}
      />
    </div>
  );
};
