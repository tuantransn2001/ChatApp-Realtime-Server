import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String },
    type: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    avatar: { type: String },
    status: {
      type: String,
      default: "offline",
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.model("User", UserSchema);

export default User;
