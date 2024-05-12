// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import GoogleSignInButton from "../github-auth-button";

// const loginFormSchema = z.object({
//   email: z.string().email({ message: "Enter a valid email address" }),
//   password: z.string().min(8, { message: "Password is required" }),
// });

// const registerFormSchema = z.object({
//   userName: z.string().min(2, { message: "Name is required" }),
//   userEmail: z.string().email({ message: "Enter a valid email address" }),
//   password: z.string().min(8, { message: "Password is required" }),
//   confirmPassword: z.string().min(8, { message: "Password is required" }),
// });

// type LoginFormValue = z.infer<typeof loginFormSchema>;
// type RegisterFormValue = z.infer<typeof registerFormSchema>;

// export default function UserAuthForm() {
//   const [isLogin, setIsLogin] = useState(true);
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl");
//   const [loading] = useState(false);
//   const loginDefaultValues = {
//     // email: "admin@gmail.com",
//     // password: "12345678",
//   };

//   const registerDefaultValues = {
//     // userName: "",
//     // userEmail: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const loginForm = useForm<LoginFormValue>({
//     resolver: zodResolver(loginFormSchema),
//     defaultValues: loginDefaultValues,
//   });

//   const registerForm = useForm<RegisterFormValue>({
//     resolver: zodResolver(registerFormSchema),
//     defaultValues: registerDefaultValues,
//   });

//   const onSubmitLogin = async (data: LoginFormValue) => {
//     signIn("credentials", {
//       email: data.email,
//       callbackUrl: callbackUrl ?? "/dashboard",
//     });
//   };

//   const onSubmitRegister = async (data: RegisterFormValue) => {
//     signIn("credentials", {
//       email: data.userEmail,
//       callbackUrl: callbackUrl ?? "/dashboard",
//     });
//   };

//   return (
//     <>
//       {isLogin ? (
//         <div className="space-y-6">
//           <div className="flex flex-col space-y-2 text-center">
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Sign in to your account
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Enter your email and password below
//             </p>
//           </div>

//           <Form {...loginForm}>
//             <form
//               onSubmit={loginForm.handleSubmit(onSubmitLogin)}
//               className="space-y-2 w-full"
//             >
//               <FormField
//                 control={loginForm.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email..."
//                         disabled={loading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={loginForm.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter your password..."
//                         disabled={loading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 disabled={loading}
//                 className="ml-auto w-full"
//                 type="submit"
//               >
//                 Login
//               </Button>
//             </form>
//           </Form>
//           <div className=" text-sm">
//             Don&apos;t have an account?{" "}
//             <span
//               className="font-semibold hover:underline cursor-pointer"
//               onClick={() => setIsLogin(false)}
//             >
//               Register.
//             </span>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <div className="flex flex-col space-y-2 text-center">
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Create an account
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Enter your details to create your account
//             </p>
//           </div>
//           <Form {...registerForm}>
//             <form
//               onSubmit={registerForm.handleSubmit(onSubmitRegister)}
//               className="space-y-2 w-full"
//             >
//               <FormField
//                 control={registerForm.control}
//                 name="userName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="text"
//                         placeholder="Enter your name..."
//                         disabled={loading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={registerForm.control}
//                 name="userEmail"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email..."
//                         disabled={loading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={registerForm.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter your password..."
//                         disabled={loading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={registerForm.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Confirm your password..."
//                         disabled={loading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 disabled={loading}
//                 className="ml-auto w-full"
//                 type="submit"
//               >
//                 Register
//               </Button>
//             </form>
//           </Form>

//           <div className=" text-sm">
//             Already have an account?{" "}
//             <span
//               className="font-semibold hover:underline cursor-pointer"
//               onClick={() => setIsLogin(true)}
//             >
//               Login.
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>
//       </div>
//       <GoogleSignInButton />
//     </>
//   );
// }

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
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";

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

    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long",
      }),
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
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const defaultValues = {
    email: "admin@gmail.com",
    password: "admin@1234",
  };

  const loginForm = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const onSubmitLogin = async (data: LoginFormValue) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl ?? "/dashboard",
    });
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
    </div>
  );
}

export function RegisterForm() {
  const [loading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  const onSubmitRegister = async (data: RegisterFormValue) => {
    signIn("credentials", {
      email: data.email,
      callbackUrl: callbackUrl ?? "/dashboard",
    });
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
