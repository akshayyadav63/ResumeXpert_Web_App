// routes/userRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userControllers');

const  protect  = require('../middleware/authMiddleware');

const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', protect, getUserProfile);

module.exports = userRouter;
