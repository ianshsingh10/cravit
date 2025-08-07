import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();

        const email = user.email.toLowerCase();

        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          const fallbackName = user.name || email.split("@")[0];

          existingUser = await User.create({
            name: fallbackName,
            email: email,
            phoneNo: "", // optional
            role: "user",
          });
        }

        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        const cookieStore = cookies();
        cookieStore.set("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 86400,
        });

        return true;
      } catch (err) {
        console.error("❌ Google Sign-In error:", err);
        return false;
      }
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  events: {
    async signIn(message) {
      console.log("✅ signIn event:", message);
    },
    async signInError(error) {
      console.error("❌ signInError event:", error);
    },
  },
});

export { handler as GET, handler as POST };
