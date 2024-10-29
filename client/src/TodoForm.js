import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoForm = ({ existingTask = null, onSave, onClose }) => {
    const getTodaysDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [name, setTask] = useState('');
    const [date, setDate] = useState(getTodaysDate());
    const [completed, setCompleted] = useState(false);

    useEffect (() => {
        if (existingTask) {
            setTask(existingTask.task);
            const formattedDate = new Date(existingTask.date).toISOString().split('T')[0];
            setDate(formattedDate);
            setCompleted(existingTask.completed);
        }
    }, [existingTask]);

    const addTodo = async () => {
        const response = await axios.post('http://localhost:5000/todos', { task: name, date, completed });
        onSave(response.data);
        reset();
    };

    const saveTodo = async () => {
        const response = await axios.put(`http://localhost:5000/todos/${existingTask._id}`, { task: name, date, completed });
        onSave(response.data);
    };

    const cancelChanges = () => {
        if (existingTask) {
            onClose();
        } else {
            reset();
        }
    };

    const reset = () => {
        setTask('');
        setDate(getTodaysDate());
        setCompleted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (existingTask)
            {
                saveTodo();
            } else {
                addTodo();
            }
        } catch (error) {
            console.error(error);
        }
      };

    return (
        <div>
          <h2>{existingTask ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Task Name:
              <input type="text" value={name} onChange={(e) => setTask(e.target.value)} required />
            </label>
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              Status:
              <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
              Completed
            </label>
            <button type="submit">{existingTask ? 'Save' : 'Add'}</button>
            <button type="button" onClick={cancelChanges}>{existingTask ? 'Close' : 'Clear'}</button>
          </form>
        </div>
      );

};
export default TodoForm;