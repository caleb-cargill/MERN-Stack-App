const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: String, 
    completed: Boolean,
    date: Date,
});

module.exports = mongoose.model('Todo', todoSchema);