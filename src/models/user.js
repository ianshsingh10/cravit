import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNo: { type: Number, required: true, unique: true },
  name: {type: String, required: true},
  otp: Number,
  otpExpiry: Date,
  role:{type: String, default: "user", enum: ["user", "admin", "seller"]},
});

export default mongoose.models.User || mongoose.model("User", userSchema);
