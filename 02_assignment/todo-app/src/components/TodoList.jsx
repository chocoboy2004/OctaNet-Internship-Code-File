import React from "react";
import { useState } from "react";
import del from "../../assets/delete.png";
import green_checked from "../../assets/green_checked.png";
import white_checked from "../../assets/white_checked.png";
import update from "../../assets/update.png";

function TodoList({ text, index, id, isComplete, deleteTodo, toggle, editTodo }) {
  return (
    <div className="flex justify-between mx-5 mb-1">
      <p className={`cursor-pointer ${isComplete ? "line-through": ""}`}>{text}</p>
      <div className="flex gap-x-2">
        <a
          onClick={() => {
            toggle(id);
          }}
        >
          <img
            src={isComplete ? green_checked : white_checked}
            className="w-4 cursor-pointer"
          />
        </a>
        <a onClick={() => { editTodo(id) }}>
          <img src={update} className="w-4 cursor-pointer" />
        </a>
        <a
          onClick={() => {
            deleteTodo(id);
          }}
        >
          <img src={del} className="w-4 cursor-pointer" />
        </a>
      </div>
    </div>
  );
}

export default TodoList;
