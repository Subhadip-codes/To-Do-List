const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "./todos.json";

// Read JSON file
function readTodos() {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

// Write to JSON file
function writeTodos(todos) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// GET all todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST a new todo
app.post("/todos", (req, res) => {
  const todos = readTodos();
  const newTodo = req.body;
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json({ message: "Todo added." });
});

// DELETE a todo by index
app.delete("/todos/:index", (req, res) => {
  const todos = readTodos();
  todos.splice(req.params.index, 1);
  writeTodos(todos);
  res.json({ message: "Todo deleted." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
