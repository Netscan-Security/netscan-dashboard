import { z } from "zod";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const machineFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  ipAddress: z.string().ip("Invalid IP Address"),
});

const AddNewMachine = () => {
  const form = useForm<z.infer<typeof machineFormSchema>>({
    resolver: zodResolver(machineFormSchema),
    defaultValues: {
      name: "",
      ipAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof machineFormSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="p-2">
        <h1 className="mb-4 text-2xl font-bold">Add Host</h1>
        <Form {...form}>
          <form
            id="HostMachineForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.formState.errors.name?.message ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Enter the name of the host
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ipAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.formState.errors.ipAddress?.message ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Enter the IP Address of the host
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button form="HostMachineForm">Add</Button>
      </DialogFooter>
    </>
  );
};

export default Hosts;
