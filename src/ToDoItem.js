import React from "react";

function TodoItem(props) {
  return (
    <li className="todo-item">
      <span
        onClick={() => props.onToggle(props.id)}
        style={{
          textDecoration: props.completed ? "line-through" : "none",
          cursor: "pointer",
          color: props.completed ? "gray" : "black"
        }}
      >
        {props.text}
      </span>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
