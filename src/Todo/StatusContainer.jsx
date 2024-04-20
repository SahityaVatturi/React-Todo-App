import React from "react";
import "./StatusContainer.css";

const StatusContainer = (props) => {
  const { title, todos = [], onDelete, onDragStart, onDragOver, onDrop } = props;
  return (
    <div className="todo-box" onDragOver={onDragOver} onDrop={(event) => onDrop(event, title)}>
      <h2>{title}</h2>
      {todos?.map((element) => {
        return (
          <div className="task-box" key={element.id} draggable onDragStart={(event) => onDragStart(event, element.id)}>
            <p>{element.name}</p>
            <button onClick={() => onDelete(element.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default StatusContainer;
