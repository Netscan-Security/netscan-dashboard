import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Local imports
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/image-uploader";
import OrganizationRegister from "./organization-register";
import { NetScanIcon } from "@/assets/brand";
import { useAuth } from "@/shared/hooks/use-auth";
import { UserData } from "@/shared/types/user";
import { toast } from "sonner";

const adminSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  contactNumber: z.string().min(1, "Contact Number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  imageUrl: z.optional(z.string()),
});

type FormData = z.infer<typeof adminSchema>;

const RegisterPage = () => {
  const { signup } = useAuth();
  const [organizationRegister, setOrganizationRegister] =
    useState<UserData | null>("da");
  const form = useForm<FormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      contactNumber: "",
      password: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: FormData) => {
    signup(data)
      .then((response) => {
        setOrganizationRegister(response);
      })
      .catch((err) => {
        toast.error("Failed to be registered");
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full sm:w-[500px] container">
        {!organizationRegister ? (
          <>
            <NetScanIcon size={40} className="mx-auto" />
            <h1 className="mb-4 text-3xl font-semibold text-center">
              Registration
            </h1>
            <Form {...form}>
              <form
                id="user-reg"
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log(errors);
                })}
                className="space-y-4"
              >
                <ImageUploader
                  onImageUpload={(imageUrl) => {
                    console.log(imageUrl);
                    // form.setValue("imageUrl", imageUrl)
                  }}
                />
                <div className="flex items-center space-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={() => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
                            {...form.register("firstName")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={() => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
                            {...form.register("lastName")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={() => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...form.register("username")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={() => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="255xxxxxxx"
                            {...form.register("contactNumber")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={() => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...form.register("email")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={() => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...form.register("password")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <Button form="user-reg" type="submit">
                    Register
                  </Button>
                  {!organizationRegister && (
                    <Link
                      to="/sign-in"
                      className="text-blue-600 hover:underline"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </form>
            </Form>
          </>
        ) : (
          <OrganizationRegister />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
