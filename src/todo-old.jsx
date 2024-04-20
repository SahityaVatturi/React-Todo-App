import React from "react";
import "./todo.css";

const Todo = () => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
  };

  return (
    <>
      <div className="status-container">
        <div className="status-box" onDrop={handleDrop} onDragOver={handleDragOver}>
          Todo <button className="add-button">+</button>
          <p className="task-card" key="todo1" id="todo1" draggable="true" onDragStart={handleDragStart}>
            task: todo1
          </p>
        </div>
        <div className="status-box" onDrop={handleDrop} onDragOver={handleDragOver}>
          In Progress <button className="add-button">+</button>
          <p className="task-card" key="inprogress1" id="inprogress1" draggable="true" onDragStart={handleDragStart}>
            task: inprogress1
          </p>
        </div>
        <div className="status-box" onDrop={handleDrop} onDragOver={handleDragOver}>
          Completed <button className="add-button">+</button>
          <p className="task-card" key="completed1" id="completed1" draggable="true" onDragStart={handleDragStart}>
            task: completed1
          </p>
        </div>
      </div>
    </>
  );
};

export default Todo;
