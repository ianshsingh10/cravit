import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET() {
  try {
    console.log("Attempting to connect to the database...");
    await dbConnect();
    console.log("Database connection successful.");
    const sellers = await User.find({ role: "seller" }, { name: 1, email: 1, _id: 1 });
    console.log("Sellers found:", sellers);

    return NextResponse.json(sellers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch sellers:", error);
    return NextResponse.json(
      { message: "Failed to fetch sellers", error: error.message },
      { status: 500 }
    );
  }
}
