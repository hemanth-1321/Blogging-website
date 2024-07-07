import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Invalid request body format",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login instead",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userId = newUser._id.toString();
    console.log(userId);

    const token = jwt.sign(
      {
        userId,
        username: newUser.username,
      },
      process.env.JWT_SECRET
    );
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration
    );

    res.json({
      token: token,
    });
  } catch (error) {
    console.error("Error during user signin:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
