import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },

    img: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
