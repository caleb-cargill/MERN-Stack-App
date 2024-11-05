require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const googleAuthRoutes = require('./routes/googleAuth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONT_URI,
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
console.log(`Targeting MongoDB: ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define routes and middleware
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});