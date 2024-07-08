import { Comment } from "../models/commentsModel.js";
import { Post } from "../models/PostModel.js";
import { User } from "../models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";

// Ensure Cloudinary is configured
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPost = async (req, res) => {
  try {
    const { text, img } = req.body;
    console.log(text);
    const userId = req.user._id;
    console.log(userId);
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Validate post content
    if (!text && !img) {
      return res.status(400).json({
        message: "Post must have text or img",
      });
    }

    let imgUrl = "";
    if (img) {
      const imgSize = Buffer.byteLength(img, "utf8"); // Assuming img is a base64 string

      if (imgSize > 10485760) {
        return res.status(400).json({
          message: "File size too large. Maximum allowed size is 10 MB.",
        });
      }

      const uploadResponse = await cloudinary.uploader.upload(img, {
        folder: "posts", // Optional: specify a folder in Cloudinary
      });
      imgUrl = uploadResponse.secure_url;
    }

    // Create new post
    const newPost = new Post({
      text,
      img: imgUrl,
      author: userId,
    });

    await newPost.save();

    user.posts.push(newPost._id);
    await user.save();
    // console.log(newPost);

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== req.user.userId.toString()) {
      return res.status(401).json({
        message: "You are not authorized to delete this post",
      });
    }

    // Delete the associated image from Cloudinary if it exists
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    // Delete the post from the database
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text, img } = req.body;

    // Find post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== req.user.userId.toString()) {
      return res.status(401).json({
        message: "You are not authorized to update this post",
      });
    }

    // Update text content
    if (text) {
      post.text = text;
    }

    // Update image if a new one is provided
    if (img) {
      // Delete the old image from Cloudinary if it exists
      if (post.img) {
        const imgId = post.img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }

      // Check the image size
      const imgSize = Buffer.byteLength(img, "utf8"); // Assuming img is a base64 string
      if (imgSize > 10485760) {
        return res.status(400).json({
          message: "File size too large. Maximum allowed size is 10 MB.",
        });
      }

      // Upload the new image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(img, {
        folder: "posts", // Optional: specify a folder in Cloudinary
      });
      post.img = uploadResponse.secure_url;
    }

    // Save the updated post
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in updatePost controller:", error);
    res.status(500).json({
      message: "Error while updating post",
      error: error.message,
    });
  }
};

export const getAllposts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");

    res.status(201).json(posts);
  } catch (error) {
    res.status(401).json({
      message: "Error in get all Posts",
      error: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found ",
      });
    }

    const posts = await Post.find({
      author: userId,
    }).populate("author", "name");

    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",

      error: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    console.log(userId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.likes.includes(userId)) {
      return res.status(404).json({
        message: "You have already liked the post",
      });
    }

    post.likes.push(userId);
    await post.save();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({
        message: "You have not liked the post",
      });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({
      message: "Post unliked successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getLikedUsers = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("likes", "username "); // Adjust the fields as needed

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Liked users retrieved successfully",
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      text,
      user: userId,
      post: postId,
    });

    await comment.save();

    // Add comment to post's comments array
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username",
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    console.log("Post:", post); // Debugging line

    res.status(200).json({
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
