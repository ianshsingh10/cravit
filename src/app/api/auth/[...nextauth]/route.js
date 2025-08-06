import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect"; // ensure you have this to connect MongoDB
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
        // Called after successful sign in
        async signIn({ user}) {
            await dbConnect();

            let existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                existingUser = await User.create({
                    name: user.name,
                    email: user.email,
                    // Add phoneNo or other fields if required
                });
            }
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


            const cookieStore = cookies();
            cookieStore.set("token", token, {
                httpOnly: true,
                path: "/",
                maxAge: 86400,
            });


            return true;
        },
    },

    
});

export { handler as GET, handler as POST };
