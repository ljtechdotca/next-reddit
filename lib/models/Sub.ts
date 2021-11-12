import { ISub } from "@lib/interfaces";
import mongoose from "mongoose";

const SubSchema = new mongoose.Schema<ISub>(
  {
    avatar: {
      type: String,
      maxlength: [64, "Sub avatar cannot be more than 64 characters."],
    },
    background: {
      type: String,
      maxlength: [64, "Sub background cannot be more than 64 characters."],
    },
    body: {
      type: String,
      maxlength: [256, "Sub body cannot be more than 256 characters."],
    },
    moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    name: {
      type: String,
      required: [true, "Please provide a name for your Sub."],
      maxlength: [32, "Sub name cannot be more than 32 characters."],
      unique: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    rules: [String],
    uri: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Sub || mongoose.model("Sub", SubSchema);
