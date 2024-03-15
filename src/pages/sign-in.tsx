import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

// Local imports
import { NetScanIcon } from "@/assets/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/context/auth";
import { Checkbox } from "@/components/ui/checkbox";
import NetScanRipplePattern from "@/components/ui/ripple-pattern";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  remember30days: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember30days: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setError("");
    setLoading(true);
    login(data.email, data.password, data.remember30days)
      .then(() => navigate("/"))
      .catch((err) => {
        setError(err?.message || "Login failed");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="relative w-full mx-auto -z-10">
        <NetScanIcon size={48} className="mx-auto" />
        <NetScanRipplePattern />
      </div>
      <div className="w-full sm:w-[400px] container ">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Sign In</h1>
          <p className="mb-4">Welcome! Please enter your details.</p>
        </div>
        {error && (
          <div className="px-4 py-2 mb-4 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Your Email"
                      {...form.register("email")}
                    />
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
                    <Input
                      disabled={loading}
                      placeholder="Password"
                      type="password"
                      required
                      {...form.register("password")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remember30days"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FormControl>
                      <Checkbox
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Remember for 30 days</FormLabel>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="!mt-0 text-sm font-semibold leading-none text-blue-600"
                  >
                    Forgot Password
                  </Link>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
            <p className="text-sm text-center">
              Copyright ©{new Date().getFullYear()}{" "}
              <span className="font-semibold text-blue-600">
                NetScan Security
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
