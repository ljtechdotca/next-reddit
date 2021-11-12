import { IPost } from "@lib/interfaces";
import mongoose from "mongoose";

const PostSchema: mongoose.Schema<IPost> = new mongoose.Schema<IPost>(
  {
    awards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Award" }],
    body: {
      type: String,
      maxlength: [1000, "Post body cannot be more than 1000 characters."],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    name: {
      type: String,
      required: [true, "Please provide a name for your Post."],
      maxlength: [256, "Post name cannot be more than 256 characters."],
    },
    sub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sub",
    },
    uri: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
