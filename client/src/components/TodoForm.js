import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignUsers from './AssignUsers';
import { GetTodaysDate } from '../utils/Utils';

const TodoForm = ({ existingTask = null, onSave, onClose }) => {
    const [name, setTask] = useState('');
    const [date, setDate] = useState(GetTodaysDate());
    const [completed, setCompleted] = useState(false);
    const [assignedUserIds, setAssignedUserIds] = useState([]);
    
    useEffect (() => {
        if (existingTask) {
            setTask(existingTask.task);
            const formattedDate = new Date(existingTask.date).toISOString().split('T')[0];
            setDate(formattedDate);
            setCompleted(existingTask.completed);
        }
    }, [existingTask]);

    const addTodo = async () => {
        const response = await axios.post('http://localhost:5000/todos', { task: name, date, completed, assignedUsers: assignedUserIds });
        onSave(response.data);
        reset();
    };

    const saveTodo = async () => {
        const response = await axios.put(`http://localhost:5000/todos/${existingTask._id}`, { task: name, date, completed, assignedUsers: assignedUserIds });
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
        setDate(GetTodaysDate());
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

    const handleUsersChange = (userIds) => {
        setAssignedUserIds(userIds);
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
            <AssignUsers onUsersChange={handleUsersChange}/>
            <button type="submit">{existingTask ? 'Save' : 'Add'}</button>
            <button type="button" onClick={cancelChanges}>{existingTask ? 'Close' : 'Clear'}</button>
          </form>
        </div>
      );

};
export default TodoForm;