import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      username,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "INternal server error",
      error: error.message,
    });
  }
};

export const follow = async (req, res) => {
  const { id } = req.params;

  try {
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (id === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({
        message: "You already follow the user",
      });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      message: "Followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const unFollow = async (req, res) => {
  const { id } = req.params;

  try {
    const currentUser = await User.findById(req.user._id);
    const userToUnfollow = await User.findById(id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (id === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot unfollow yourself",
      });
    }

    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res.status(400).json({
        message: "You are not following the user",
      });
    }

    // Remove userToUnfollow from currentUser's following array
    await User.updateOne(
      { _id: currentUser._id },
      { $pull: { following: userToUnfollow._id } }
    );

    // Remove currentUser from userToUnfollow's followers array
    await User.updateOne(
      { _id: userToUnfollow._id },
      { $pull: { followers: currentUser._id } }
    );

    res.status(200).json({
      message: "Unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export const getFollowers = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("followers", "username"); //This populates the followers field with only the username from the related documents.

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const followerUserName = user.followers.map(
      (follower) => follower.username
    );

    res.status(201).json({ followers: followerUserName });
    console.log(followerUserName);
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export const getFollowing = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("following", "username");

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    const followingUserName = user.following.map(
      (follower) => follower.username
    );
    res.status(201).json({
      following: followingUserName,
    });
  } catch (error) {
    res.status(500).josn({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  const {
    username,
    email,
    currentPassword,
    newPassword,
    bio,
    link,
    profileImg,
    coverImg,
  } = req.body;

  console.log("Request Body:", req.body); // Log the entire request body
  console.log("Bio:", bio); // Log the bio separately

  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (
      (newPassword && !currentPassword) ||
      (!newPassword && currentPassword)
    ) {
      return res.status(400).json({
        message: "Enter both newPassword and currentPassword",
      });
    }

    if (newPassword && currentPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(400).json({
          message: "currentPassword does not match",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(profileImg);
      user.profileImg = uploadResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(coverImg);
      user.coverImg = uploadResponse.secure_url;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.link = link || user.link;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        link: user.link,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
