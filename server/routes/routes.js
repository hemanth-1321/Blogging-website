// routes.js
import express from "express";
import { logout, register, signin } from "../controllers/authControllers.js";
import {
  createComment,
  createPost,
  deletePost,
  getAllposts,
  getComments,
  getLikedUsers,
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
  updateUserProfile,
} from "../controllers/userControlller.js";

const router = express.Router();

//auth Routes
router.post("/register", register);
router.post("/login", signin);
router.post("/logout", logout);

//post Routes
router.post("/posts/create", authenticate, createPost); // Use the upload middleware
router.delete("/post/delete/:id", authenticate, deletePost);
router.put("/post/update/:id", authenticate, updatePost);
router.get("/post/getAll", authenticate, getAllposts);
router.get("/post/:id/getPosts", authenticate, getUserPosts);
router.post("/post/:id/like", authenticate, likePost);
router.post("/post/:id/unlike", authenticate, unlikePost);
router.get("/likedUsers/:id", authenticate, getLikedUsers);

router.post("/posts/:id/comments", authenticate, createComment);
router.get("/posts/:id/comments", authenticate, getComments);
//userProfileRoutes

router.get("/profile/:username", getUserProfile);
router.post("/follow/:id", authenticate, follow);
router.post("/unfollow/:id", authenticate, unFollow);
router.get("/followers/:userId", authenticate, getFollowers);
router.get("/following/:userId", authenticate, getFollowing);
router.post("/update/:userId", authenticate, updateUserProfile);
export default router;
