import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "name" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { name, password } = credentials as {
          name: string;
          password: string;
        };

        const user: any = await signIn(name);

        if (user) {
          const passwordConfirm = await compare(password, user.password);

          if (passwordConfirm) {
            return user;
          }

          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.name = user.name;
        token.phonenumber = user.phonenumber;
        token.password = user.password;
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("phonenumber" in token) {
        session.user.phonenumber = token.phonenumber;
      }
      if ("password" in token) {
        session.user.password = token.password;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOption);
