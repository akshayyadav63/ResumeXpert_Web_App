const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB=require('./config/db');
const userRouter=require('./routes/userRoutes')


const app = express();
const PORT = process.env.PORT || 4000;

// connect to MongoDB
 connectDB()

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRouter)

// routes
app.get('/', (req, res) => {
    res.send("API working");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
