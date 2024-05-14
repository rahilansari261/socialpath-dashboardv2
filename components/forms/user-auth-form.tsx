"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";
import axios from "axios";


const loginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, { message: "Password is required" }),
});

const registerFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
    phone: z.string().min(10, { message: "Phone number is required" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

type LoginFormValue = z.infer<typeof loginFormSchema>;
type RegisterFormValue = z.infer<typeof registerFormSchema>;

export function LoginForm() {
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const defaultValues = {
    email: "admin@gmail.com",
    password: "admin@1234",
  };

  const loginForm = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const onSubmitLogin = async (data: LoginFormValue) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below
        </p>
      </div>

      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmitLogin)}
          className="space-y-2 w-full"
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}

export function RegisterForm() {
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    Phone: "",
  };

  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  const onSubmitRegister = async (data: RegisterFormValue) => {
    try {
       await axios(`/api/users`, {
        method: "POST",
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
      });

      router.replace("/dashboard");
    } catch (error: any) {
      setError(error?.response?.data.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitRegister)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    disabled={loading}
                    {...field}
                  />
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
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your phone number..."
                    disabled={loading}
                    {...field}
                  />
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
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}

export default function UserAuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      {isLogin ? (
        <div className=" text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            Register.
          </span>
        </div>
      ) : (
        <div className=" text-sm">
          Already have an account?{" "}
          <span
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => setIsLogin(true)}
          >
            Login.
          </span>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
