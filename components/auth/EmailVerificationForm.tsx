"use client";

import { verifyEmailToken } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthCard from "./AuthCard";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleVerification = useCallback(async () => {
    if (success || error) return;
    if (!token) {
      setError("Token is missing.");
      return;
    }
    verifyEmailToken(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      cardTitle="Verify your account."
      backButtonLabel="Back to login."
      backButtonHref="/auth/login"
    >
      <div className="flex items-center flex-col w-full justify-center">
        <p>{!success && !error ? "Verifying Email...." : null}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
};

export default EmailVerificationForm;
