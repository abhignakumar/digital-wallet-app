import z from "zod";
import prisma from "@repo/db";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const phoneNumberSchema = z.string().length(10);
const passwordSchema = z.string().min(4);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "Enter your Phone Number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials) {
        const phoneNumber = phoneNumberSchema.safeParse(
          credentials?.phoneNumber
        );
        const password = passwordSchema.safeParse(credentials?.password);

        if (!phoneNumber.success || !password.success) return null;

        const user = await prisma.user.findUnique({
          where: {
            phoneNumber: phoneNumber.data,
          },
        });

        if (!user) return null;

        const passwordValidation = await bcrypt.compare(
          password.data,
          user.password
        );
        if (passwordValidation)
          return {
            id: user.id.toString(),
          };
        else return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
