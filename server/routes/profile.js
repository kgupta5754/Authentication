const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); // Example user model
const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (token === null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
  
// GET user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Logic to fetch user profile based on JWT token, e.g., from database
    const userId = req.user._id; // Extract user ID from the token
    console.log(userId)
    const userProfile = await User.findById(userId).select('-password'); // Fetch user profile

    res.status(200).json(userProfile); // Send user profile as JSON response
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
