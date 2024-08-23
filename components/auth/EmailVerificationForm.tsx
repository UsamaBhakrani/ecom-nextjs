"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  return <div>EmailVerificationForm</div>;
};

export default EmailVerificationForm;
