"use client";

import AuthCard from "./AuthCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { loginFormSchema } from "@/types/types";
import Link from "next/link";
import { emailSignIn } from "@/server/actions/emailSignIn";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { execute, status } = useAction(emailSignIn, {
    onSuccess: (data) => {
      if (data.error) setError(data.error);
      if (data.success) setSuccess(data.success);
    },
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      cardTitle="Login"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="usamabhakrani@gmail.com"
                    {...field}
                    type="email"
                    autoComplete="email"
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
                    placeholder="********"
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button size={"sm"} variant={"link"} asChild>
            <Link href="/auth/reset">Forgot your password?</Link>
          </Button>
          <Button
            type="submit"
            className={cn(
              "w-full",
              status === "executing" ? "animate-pulse" : ""
            )}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default LoginForm;
