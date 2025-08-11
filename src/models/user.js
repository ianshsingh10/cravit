import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNo: { type: String, default: "" }, // ⛳️ use String for phone numbers
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: "" }, // Optional - Google OAuth users won't have passwords
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
