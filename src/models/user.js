import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Phone number in E.164 format (e.g. +919876543210)
    phoneNo: { type: String, default: "" },

    // Whether the phone has been verified via OTP
    phoneVerified: { type: Boolean, default: false },

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, default: "" },

    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev/hot reload
export default mongoose.models.User || mongoose.model("User", userSchema);