import "dotenv/config";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { loginFormSchema } from "@/types/types";
import { eq } from "drizzle-orm";
import { accounts, users } from "./schema";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });
      if (!existingUser) return token;
      const existingAccount = await db.query.users.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });
      token.isOAuth = existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingAccount?.twoFactorEnabled;
      token.image = existingUser.image;
      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
});
