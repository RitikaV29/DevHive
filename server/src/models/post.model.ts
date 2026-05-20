import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["normal", "project"],
      required: true,
    },
    content: {
      type: String,
    },
    media: [
      {
        url: String,
        mediaType: {
          type: String,
          enum: ["image", "video"],
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    githubLink: {
      type: String,
    },
    liveLink: {
      type: String,
    },
    techStack: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
