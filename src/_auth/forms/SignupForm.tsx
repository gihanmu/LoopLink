import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormSchema } from "@/lib/validations";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCrerateUserAccount,
  useSignInUser,
} from "@/lib/react-query/queriesAndMutations";

function SignupForm() {
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCrerateUserAccount();
  const { mutateAsync: signInUser } = useSignInUser();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof SignupFormSchema>) {
    const newUser = createUserAccount(values);
    if (!newUser) {
      toast({
        title: "Error",
        description: "Error in user sign up",
      });
    }
    const session = signInUser({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      toast({
        title: "Error",
        description: "Error in user sign in",
      });
    }
  }
  return (
    <Form {...form}>
      <img src="/assets/images/logo.png" alt="Logo" className="w-20" />
      <h2 className="font-bold my-2 ">Create a new account</h2>
      <p className="text-sm my-1">To use LoopLink, Please enter your details</p>
      <form
        onSubmit={form.handleSubmit(handleSignup)}
        className="space-y-8 w-1/3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input w-full" {...field} />
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
                <Input
                  type="password"
                  className="shad-input w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="shad-button_primary w-full">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </div>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link
          to={"/sign-in"}
          className="text-primary-500 text-small-semibold ml-1"
        >
          Login
        </Link>
      </p>
    </Form>
  );
}

export default SignupForm;
