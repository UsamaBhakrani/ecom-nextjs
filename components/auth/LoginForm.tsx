"use client";

import AuthCard from "./AuthCard";

const LoginForm = () => {
  return (
    <AuthCard
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      cardTitle="Welcome Back!"
      showSocials
    >
      <div></div>
    </AuthCard>
  );
};

export default LoginForm;
