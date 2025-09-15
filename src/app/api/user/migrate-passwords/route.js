import { migrateUsersWithoutPasswords } from "@/lib/migrateUsers";

export async function POST(req) {
  try {
    await migrateUsersWithoutPasswords();
    
    return Response.json({ 
      message: "Password migration completed successfully",
      note: "Check console for details"
    });
  } catch (error) {
    console.error("Migration API error:", error);
    return Response.json({ 
      error: "Migration failed",
      details: error.message 
    }, { status: 500 });
  }
} 