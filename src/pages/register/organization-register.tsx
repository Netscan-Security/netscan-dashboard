import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Local imports
import { NetScanIcon } from "@/assets/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ui/image-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const organizationSchema = z.object({
  organizationName: z.string().min(1, "Organization Name is required"),
  description: z.optional(z.string()),
  organizationimageUrl: z.optional(z.string()),
});

type FormData = z.infer<typeof organizationSchema>;

const OrganizationRegister = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      organizationName: "",
      description: "",
      organizationimageUrl: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <NetScanIcon size={40} className="mx-auto" />
          <h1 className="mb-4 text-3xl font-semibold text-center">
            Organization Registration
          </h1>
          <ImageUploader
            onImageUpload={(imageUrl) => {
              console.log(imageUrl);
              // form.setValue("organizationimageUrl", imageUrl)
            }}
          />
          <FormField
            control={form.control}
            name="organizationName"
            render={() => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input {...form.register("organizationName")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...form.register("description")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  );
};

export default OrganizationRegister;
