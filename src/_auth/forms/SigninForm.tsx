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
import { SignInFormSchema, SignupFormSchema } from "@/lib/validations";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCrerateUserAccount,
  useSignInUser,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

function SignInForm() {
  const navigate = useNavigate();

  const { mutateAsync: signInUser } = useSignInUser();
  const { toast } = useToast();
  const { checkAuthUser, isLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    const session = await signInUser({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Error",
        description: "Error in user sign in",
      });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Error",
        description: "Sign ip failed. Please try again.",
      });
    }
  }
  return (
    <Form {...form}>
      <img src="/assets/images/logo.png" alt="Logo" className="w-20" />
      <h2 className="font-bold my-2 ">Create a new account</h2>
      <p className="text-sm my-1">To use LoopLink, Please enter your details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3">
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
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </form>
      <p className="text-center mt-4">
        Dont' have an account?{" "}
        <Link
          to={"/sign-up"}
          className="text-primary-500 text-small-semibold ml-1"
        >
          Signup
        </Link>
      </p>
    </Form>
  );
}

export default SignInForm;
