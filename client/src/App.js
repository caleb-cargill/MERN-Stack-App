import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import './styles/App.css';
import Register from './components/Register';
import Login from './components/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SettingsForm from './components/Settings';
import { SetTheme } from './utils/ThemeProvider';

const App = () => {
  require('dotenv').config();
  const [todos, setTodos] = useState([]);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
    .then(response => setTodos(response.data))
    .catch(error => console.error(error));
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
    .then(() => setTodos(todos.filter(todo => todo._id !== id)))
    .catch(error => console.error('Error deleting todo:', error));
  };

  const editTodo = (task) => {
    setCurrentTodo(task);
    setShowEditTaskModal(true);
  };

  const closeEditModal = () => {
    setCurrentTodo(null);
    setShowEditTaskModal(false);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    closeEditModal();
  };

  SetTheme();

  return loggedInUser 
  ? (    
    <div className="container">
      <h1>MERN Stack Todo App</h1>
      <div>
        <p>Welcome {loggedInUser}</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => setShowSettingsModal(true)}>Settings</button>
      </div>
      <TodoForm onSave={addTodo} />
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {todos.map(todo => (
          <tr key={todo._id}>
            <td>{todo.task}</td>
            <td>{new Date(todo.date).toISOString().split('T')[0]}</td>
            <td>{todo.completed ? "Completed" : "Pending"}</td>
            <td>
              <button onClick={() => editTodo(todo)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {showEditTaskModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <TodoForm existingTask={currentTodo} onSave={updateTodo} onClose={closeEditModal} />
        </div>
      </div>
      )}

      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SettingsForm onClose={() => setShowSettingsModal(false)}/>
          </div>
        </div>
      )}
    </div>
  ) : (
    <GoogleOAuthProvider clientId="126356443125-hjeefb6lg1qqri1lkrmokvnkmjl5rhhv.apps.googleusercontent.com">
      <div>
        <Register />
        <Login setLoggedInUser={setLoggedInUser}/>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
