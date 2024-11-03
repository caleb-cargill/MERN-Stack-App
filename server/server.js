const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const googleAuthRoutes = require('./routes/googleAuth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
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