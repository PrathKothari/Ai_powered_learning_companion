const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String, // Note: store hashed passwords in production
});
const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful" });
});

// Register endpoint (for testing)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
        return res.status(409).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: "User registered successfully" });
});

app.listen(3001, () => {
    console.log("Backend running at http://localhost:3001");
});
