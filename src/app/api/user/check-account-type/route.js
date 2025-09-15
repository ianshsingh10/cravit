import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    
    const hasPassword = user.password && user.password !== "";
    
    return Response.json({ 
      hasPassword,
      accountType: hasPassword ? "email_password" : "google_oauth",
    });
    
  } catch (error) {
    console.error("Check account type error:", error);
    return Response.json({ 
      error: "Failed to check account type",
      details: error.message 
    }, { status: 500 });
  }
} 