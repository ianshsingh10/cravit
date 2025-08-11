import dbConnect from "./dbConnect.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export async function migrateUsersWithoutPasswords() {
  try {
    await dbConnect();
    
    const usersWithoutPassword = await User.find({ 
      $or: [
        { password: { $exists: false } },
        { password: "" },
        { password: null }
      ]
    });
    
    if (usersWithoutPassword.length === 0) {
      console.log("No users found without passwords");
      return;
    }
    
    console.log(`Found ${usersWithoutPassword.length} users without passwords`);
    console.log("Note: Users who registered via Google OAuth typically don't have passwords");
    console.log("This migration will set a default password for manual login");
    
    // Set a default password for each user
    const defaultPassword = "changeme123"; // Users should change this
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);
    
    for (const user of usersWithoutPassword) {
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      console.log(`Updated user: ${user.email}`);
    }
    
    console.log("Migration completed successfully");
    console.log("Users should change their default password on next login");
    console.log("Google OAuth users can continue using Google login or use the default password");
    
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Uncomment the line below to run the migration
// migrateUsersWithoutPasswords(); 