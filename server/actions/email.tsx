"use server";

import getBaseUrl from "@/lib/baseUrl";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();
export const sendVerificationEmail = async (email: string, token: string) => {
  // Send email using email service
  const confirmLink = `${domain}/auth/verify?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Ecom-NextJs Verification Email",
    html: `<p>Click to <a href='${confirmLink}'>confirm your email</a> </p>`,
  });
  if (data) return data;
  if (error) return console.log(error);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // Send email using email service
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Ecom-NextJs Verification Email",
    html: `<p>Click to <a href='${confirmLink}'>reset your password</a> </p>`,
  });
  if (data) return data;
  if (error) return console.log(error);
};
