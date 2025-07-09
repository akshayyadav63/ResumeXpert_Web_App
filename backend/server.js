const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const resumeRouter = require('./routes/resumeRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRouter);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://resumexpert-web-app.onrender.com");
  next();
});

app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
