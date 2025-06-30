const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  createdResume,
  getUserResume,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resumeControllers');
const { uploadResumeImage } = require('../controllers/uploadImages');

const resumeRouter = express.Router();

resumeRouter.post('/', protect, createdResume);
resumeRouter.get('/', protect, getUserResume);
resumeRouter.get('/:id', protect, getResumeById);
resumeRouter.put('/:id', protect, updateResume);
resumeRouter.put('/:id/upload-images', protect, uploadResumeImage);
resumeRouter.delete('/:id', protect, deleteResume);

module.exports = resumeRouter;
