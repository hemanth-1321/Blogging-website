import jwt from "jsonwebtoken";
import { User } from "./models/UserModel.js"; // Ensure this path is correct

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    req.user = {
      _id: user._id,
      username: user.username,
      // Add other fields if necessary
    };

    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid token.",
      error: error.message,
    });
  }
};
