import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNo: { type: Number, unique: true },
  name: {type: String, required: true},
  email:{type: String, required: true, unique: true },
  password:{type: String},
  role:{type: String, default: "user", enum: ["user", "admin", "seller"]},
});

export default mongoose.models.User || mongoose.model("User", userSchema);
