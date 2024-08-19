"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";

const UserButton = ({ user, expires }: Session) => {
  return (
    <div>
      <h1>{user?.email}</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default UserButton;
