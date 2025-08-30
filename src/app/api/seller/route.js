import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET() {
  try {
    await dbConnect();
    const sellers = await User.find({ role: "seller" });

    return NextResponse.json(sellers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch sellers:", error);
    return NextResponse.json(
      { message: "Failed to fetch sellers", error: error.message },
      { status: 500 }
    );
  }
}
