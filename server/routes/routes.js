// routes.js
import express from "express";
import { register, signin } from "../controllers/authControllers.js";
import {
  createPost,
  deletePost,
  getAllposts,
  getUserPosts,
  likePost,
  unlikePost,
  updatePost,
} from "../controllers/postControllers.js";
import { authenticate } from "../midddleware.js";
import {
  follow,
  getFollowers,
  getFollowing,
  getUserProfile,
  unFollow,
} from "../controllers/userControlller.js";

const router = express.Router();

//auth Routes
router.post("/register", register);
router.post("/login", signin);

//post Routes
router.post("/post/create", authenticate, createPost); // Use the upload middleware
router.delete("/post/delete/:id", authenticate, deletePost);
router.put("/post/update/:id", authenticate, updatePost);
router.get("/post/getAll", authenticate, getAllposts);
router.get("/post/:id/getPosts", authenticate, getUserPosts);
router.get("/post/:id/getPosts", authenticate, getUserPosts);
router.post("/post/:id/like", authenticate, likePost);
router.post("/post/:id/unlike", authenticate, unlikePost);

//userProfileRoutes

router.get("/:username", getUserProfile);
router.post("/follow/:id", authenticate, follow);
router.post("/unfollow/:id", authenticate, unFollow);
router.get("/followers/:userId", authenticate, getFollowers);
router.get("/following/:userId", authenticate, getFollowing);

export default router;
