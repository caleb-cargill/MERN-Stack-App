import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import './styles/App.css';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
  };

  const closeEditModal = () => {
    setCurrentTodo(null);
    setShowModal(false);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    closeEditModal();
  };



  return loggedInUser 
  ? (    
    <div className="container">
      <h1>MERN Stack Todo App</h1>
      <div>
        <p>Welcome {loggedInUser}</p>
        <button onClick={handleLogout}>Logout</button>
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

      {showModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <TodoForm existingTask={currentTodo} onSave={updateTodo} onClose={closeEditModal} />
        </div>
      </div>
      )}
    </div>
  ) : (
    <div>
      <Register />
      <Login setLoggedInUser={setLoggedInUser}/>
    </div>
  );
};

export default App;
