import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, { id: Math.random().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const toggleTaskCompleted = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  return renderApp({
    task, setTask, addTask, tasks, toggleTaskCompleted, removeTask, handleKeyPress, removeAllTasks
  });
}

function renderApp({ task, setTask, addTask, tasks, toggleTaskCompleted, removeTask, handleKeyPress, removeAllTasks }) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={addTask}>Add Task</button>
          <button onClick={removeAllTasks}>Remove All</button>
        </div>
        <div className="tasks-container">
          {tasks.map((task) => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`} onClick={() => toggleTaskCompleted(task.id)}>
              <span>{task.text}</span>
              <button onClick={(e) => { e.stopPropagation(); removeTask(task.id); }}>X</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;