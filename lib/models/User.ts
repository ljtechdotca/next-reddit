import { IUser } from "@lib/interfaces";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
    avatar: {
      type: String,
      maxlength: [64, "User avatar cannot be more than 64 characters."],
    },
    awards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Award" }],
    body: {
      type: String,
      maxlength: [256, "User body cannot be more than 256 characters."],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    email: {
      type: String,
      maxlength: [64, "User email cannot be more than 64 characters."],
    },
    karma: Number,
    locale: String,
    name: {
      type: String,
      required: [true, "Please provide a name for your User."],
      maxlength: [32, "User name cannot be more than 32 characters."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password for your User."],
      maxlength: [64, "User password cannot be more than 64 characters."],
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    uri: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
