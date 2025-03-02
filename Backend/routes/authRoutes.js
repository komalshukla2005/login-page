const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!", user: { name, email } }); // ✅ Return user info
  } catch (error) {
    res.status(500).json({ message: "Server error during signup!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
    });

    res.json({ message: "Login successful!", user: { name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login!" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token"); 
  res.json({ message: "Logged out successfully!" });
});

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: `Welcome ${user.name}`, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
