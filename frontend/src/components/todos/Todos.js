import React, { useState, useEffect, useMemo } from "react";
import { isAuthenticated } from "../../api/Api";
import "./Todos.css";
import Header from "./Header";
import Input from "./Input";
import Task from "./Task";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios.defaults.headers = {
//   authorization: `Bearer ${localStorage.getItem('token')}`
// }

function Todos() {
  const [title, setTitle] = useState("");
  const [tasks, setTask] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authenticated = await isAuthenticated();
  //     setIsAuth(authenticated);
  //   };

  //   checkAuth();
  // }, []);
  const isAuth = localStorage.getItem("token");

  const onInputChange = (event) => {
    setTitle(event.target.value);
  };

  const updateTask = (title, id, completed) => {
    const newTask = tasks.map((task) =>
      task.id === id ? { title, id, completed } : task
    );
    axios
      .put(`http://localhost:4000/updateTask/${id}`, {
        title: title,
      })
      .catch((error) => console.log("Update>>error: ", error));
    setTask(newTask);
    setEditTask("");
  };

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    } else {
      setTitle("");
    }
  }, [setTitle, editTask]);

  const disableAddButton = useMemo(() => !title, [title]);

  function handleAdd(event) {
    event.preventDefault();
    if (!editTask) {
      axios
        .post(`http://localhost:4000/createTask`, { description: title })
        .then((response) => setTask([...tasks, response.data]))
        .catch((error) => {
          console.log("handleAdd>>error: ", error);
        });

      setTitle("");
    } else {
      updateTask(title, editTask.id, editTask.completed);
    }
  }
  return (
    <div className="container">
      {isAuth ? (
        <div className="wrap-container">
          <div>
            <Header />
          </div>
          <div>
            <Input
              value={title}
              onChange={onInputChange}
              onInput={handleAdd}
              editTask={editTask}
              setEditTask={setEditTask}
              disabled={disableAddButton}
            />
          </div>
          <div>
            <Task tasks={tasks} setTask={setTask} setEditTask={setEditTask} />
          </div>
        </div>
      ) : (
        <div className="message">
          <p>You need to log in or sign up</p>
          <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Todos;
