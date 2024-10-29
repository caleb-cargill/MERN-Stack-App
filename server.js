const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern-stack-db', {
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const todoSchema = new mongoose.Schema({
    task: String, 
    completed: Boolean,
    date: Date,
});
const Todo = mongoose.model('Todo', todoSchema);

// Route to fetch todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error});
    }
});

app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try 
    {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({message: 'Todo deleted successfully'});
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Error deleting todo', error });
    }
});

// Define routes and middleware
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});