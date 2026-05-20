import mongoose, { Document, Schema } from "mongoose";

interface IMedia {
  url: string;
  mediaType: "image" | "video";
}

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;

  postType: "normal" | "project";

  content?: string;

  media?: IMedia[];

  likes: mongoose.Types.ObjectId[];

  comments: mongoose.Types.ObjectId[];

  githubLink?: string;

  liveLink?: string;

  techStack?: string[];
}

const postSchema: Schema<IPost> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postType: {
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

  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;