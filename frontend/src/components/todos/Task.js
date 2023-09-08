import React, { useEffect } from "react";
import axios from "axios";
function Task({ tasks, setTask, setEditTask }) {
  useEffect(() => {
    axios
      .get(`http://localhost:4000/getTask`)
      .then((res) => setTask(res.data))
      .catch((error) => console.log("Get>>error : ", error));
  }, [setTask]);
  const handleEdit = ({ id }) => {
    console.log("Edit");
    const findTask = tasks.find((task) => task.id === id);
    setEditTask(findTask);
  };

  const handleComplete = (task) => {
    const { id, completed } = task;
    console.log("complete");
    axios
      .put(`http://localhost:4000/putTodo/${id}`, {
        completed: !completed,
      })
      .then(() => {
        const updateTask = tasks.map((item) => {
          if (item.id === id) {
            item.completed = !completed;
          }
          return item;
        });
        setTask(updateTask);
      })
      .catch((error) => console.log("Complete>>error : ", error));
  };
  const handleDelete = ({ id }) => {
    console.log("Delete");
    axios
      .delete(`http://localhost:4000/deleteTask/${id}`)
      .then((res) => {
        const changeTask = tasks.filter((item) => item.id !== id);
        setTask(changeTask);
      })
      .catch((error) => console.log("Delete>>error", error));
  };

  return (
    <div>
      {tasks.map((task) => (
        <li className="task-list" key={task.id}>
          <input
            type="text"
            value={task.description}
            className={`list ${task.completed ? "complete" : ""}`}
            onChange={(event) => event.preventDefault}
          />

          <div>
            <button
              className="complete-button"
              onClick={() => handleComplete(task)}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <button className="edit-button" onClick={() => handleEdit(task)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(task)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default Task;
