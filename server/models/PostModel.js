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
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export { Post };
