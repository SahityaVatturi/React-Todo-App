import React, { useMemo, useState } from "react";
import "./todo.css";
import StatusContainer from "./StatusContainer";

/**
 * todo
 *   {
 *       id: 1,
 *       name: "todo1",
 *       status: ENUM -> todo, inprogerss, completed
 * }
 */

const Todo = () => {
  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("title");
    const status = formData.get("status");
    setTodos((preTodos) => {
      return [...preTodos, { id: Date.now(), name, status }];
    });
  };

  
  const [Todos, setTodos] = useState([]);

  const TodoTodos = useMemo(() => {
    return Todos.filter((todo) => todo.status === "TODO");
  }, [Todos]);

  const InprogressTodos = useMemo(() => {
    return Todos.filter((todo) => todo.status === "INPROGRESS");
  }, [Todos]);

  const CompletedTodos = useMemo(() => {
    return Todos.filter((todo) => todo.status === "COMPLETED");
  }, [Todos]);

  const handleDelete = (id) => {
    setTodos((preTodos) => {
      const NewTodos = preTodos.filter((todo) => todo.id !== id);
      return NewTodos;
    });
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
  };
  const hanldleDragOver = (event) => {
    event.preventDefault();
  };

  const hanldleDrop = (event, toStatus) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    setTodos((prev) => {
      const NewTodos = prev.map((element) => {
        if (element.id == id) {
          element.status = toStatus;
        }
        return element;
      });

      return NewTodos;
    });
  };

  React.useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem("Todos") || "[]"));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("Todos", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input type="text" name="title" placeholder="Enter task" required />
        <select name="status" id="status">
          <option value="TODO">TODO</option>
          <option value="INPROGRESS">INPROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button type="submit">ADD</button>
      </form>

      <div className="TodosContainer">
        <StatusContainer
          title="TODO"
          todos={TodoTodos}
          onDelete={handleDelete}
          onDragStart={handleDragStart}
          onDragOver={hanldleDragOver}
          onDrop={hanldleDrop}
        />
        <StatusContainer
          title="INPROGRESS"
          todos={InprogressTodos}
          onDelete={handleDelete}
          onDragStart={handleDragStart}
          onDragOver={hanldleDragOver}
          onDrop={hanldleDrop}
        />
        <StatusContainer
          title="COMPLETED"
          todos={CompletedTodos}
          onDelete={handleDelete}
          onDragStart={handleDragStart}
          onDragOver={hanldleDragOver}
          onDrop={hanldleDrop}
        />
      </div>

    </div>
  );
};

export default Todo;
