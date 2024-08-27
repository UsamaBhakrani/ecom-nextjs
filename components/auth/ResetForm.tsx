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
import { resetSchema } from "@/types/types";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { passwordReset } from "@/server/actions/passwordReset";

const ResetForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { execute, status } = useAction(passwordReset, {
    onSuccess: (data) => {
      if (data.error) setError(data.error);
      if (data.success) setSuccess(data.success);
    },
  });

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      cardTitle="Reset Password"
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
                    disabled={status === "executing"}
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
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default ResetForm;
