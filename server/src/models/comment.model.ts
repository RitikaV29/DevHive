import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;

  post: mongoose.Types.ObjectId;

  content: string;
}

const commentSchema: Schema<IComment> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true }
);

const Comment = mongoose.model<IComment>(
  "Comment",
  commentSchema
);

export default Comment;