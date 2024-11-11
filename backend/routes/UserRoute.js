const express = require("express");
const User = require("../models/UserModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userAdded = await User.create({ username, password });
    res.status(201).json(userAdded);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request:", { username, password }); 
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showUsers = await User.find();
    res.status(200).json(showUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
