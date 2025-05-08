const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Correct path to User model

// Register
router.post('/register', async (req, res) => {
    try {
      const data = req.body;
      console.log("🔔 Incoming registration data:", data);  // DEBUG LOG
  
      if (!data.Name || !data.Password) {
        return res.status(400).json({ message: "Missing Name or Password" });
      }
  
      const existing = await User.findOne({ username: data.Name });
      if (existing) {
        return res.status(409).json({ message: "Username already exists" });
      }
  
      const newUser = new User({
        ...data,
        username: data.Name,
        password: data.Password,
      });
  
      await newUser.save();
  
      return res.status(201).json({ message: "User registered successfully" });
  
    } catch (err) {
      console.error("🔥 Registration failed:", err);
      return res.status(500).json({ message: err.message || "Server error" });
    }
  });
  
  

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
