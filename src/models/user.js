import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNo: { type: Number, required: true, unique: true },
  name: {type: String, required: true},
  otp: Number,
  otpExpiry: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
