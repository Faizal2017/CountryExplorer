import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

// User registration and login controller functions
export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await User.findOne({ username });
    if (users) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    return res.status(400).json({ error: "Registration failed" });
  }
};


// Login function to authenticate user and generate JWT token
export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received:", username, password); // Debugging line
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch (err) {
    return res.status(400).json({ error: "Login failed" });
  }
};
