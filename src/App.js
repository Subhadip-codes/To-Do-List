import React, { useState, useEffect } from "react";
import TodoItem from "./ToDoItem";
import axios from "axios";
import "./styles.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend on page load
  useEffect(() => {
    axios.get("http://localhost:5000/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new todo
  function addTodo() {
    if (!inputText.trim()) return;

    const newTodo = { text: inputText, completed: false };

    axios.post("http://localhost:5000/todos", newTodo)
      .then(() => {
        setTodos([...todos, newTodo]);
        setInputText("");
      });
  }

  // Delete a todo by index
  function deleteTodo(index) {
    axios.delete(`http://localhost:5000/todos/${index}`)
      .then(() => {
        setTodos(todos.filter((_, i) => i !== index));
      });
  }

  // Toggle complete (frontend only)
  function toggleComplete(index) {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Add a task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            id={index}
            text={todo.text}
            completed={todo.completed}
            onDelete={deleteTodo}
            onToggle={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
