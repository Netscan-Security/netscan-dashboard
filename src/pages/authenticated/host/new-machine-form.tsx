import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Local imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useHostMachines } from "@/services/context/host-machines";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const machineFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  ipAddress: z.string().ip("Invalid IP Address"),
});

const AddNewMachine = ({ closeModal }: { closeModal: () => void }) => {
  const { setHostMachinesInfo } = useHostMachines();
  const form = useForm<z.infer<typeof machineFormSchema>>({
    resolver: zodResolver(machineFormSchema),
    defaultValues: {
      name: "",
      ipAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof machineFormSchema>) {
    setHostMachinesInfo((prev) => {
      return [
        ...(prev || []),
        {
          id: (prev || []).length + 1,
          name: values.name,
          ipAddress: values.ipAddress,
          status: "Online",
          lastScanned: new Date().toISOString(),
          machineSpecs: {
            os: "Windows",
            cpu: "Intel Core i5",
            ram: "8",
          },
        },
      ];
    });
    closeModal();
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

export default AddNewMachine;
