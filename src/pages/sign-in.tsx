import { z } from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Local imports
import { NetscanIcon } from "@/assets/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NetscanRipplePattern from "@/components/ui/ripple-pattern";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember30days: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const SignInPage: React.FC = () => {
  const form = useForm<FormData>();

  const onSubmit = (data: z.infer<typeof schema>) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="relative w-full mx-auto -z-10">
        <NetscanIcon size={48} className="mx-auto" />
        <NetscanRipplePattern />
      </div>
      <div className="w-full sm:w-[350px] container ">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Sign In</h1>
          <p className="mb-4">Welcome! Please enter your details.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Remember for 30 days</FormLabel>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="!mt-0 text-sm font-semibold leading-none text-lochmara-600"
                  >
                    Forgot Password
                  </Link>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-sm text-center">
              Copyright ©{new Date().getFullYear()}{" "}
              <span className="font-semibold text-lochmara-600">
                Netscan Security
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
