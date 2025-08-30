import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new task
  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✅ To-Do App</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button style={styles.button} onClick={addTask}>
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filters}>
        <button
          style={{
            ...styles.filterBtn,
            background: filter === "all" ? "#007bff" : "#ddd",
            color: filter === "all" ? "white" : "black",
          }}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          style={{
            ...styles.filterBtn,
            background: filter === "active" ? "#007bff" : "#ddd",
            color: filter === "active" ? "white" : "black",
          }}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          style={{
            ...styles.filterBtn,
            background: filter === "completed" ? "#007bff" : "#ddd",
            color: filter === "completed" ? "white" : "black",
          }}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p style={{ color: "gray" }}>No tasks here. ✍️</p>
      ) : (
        <ul style={styles.list}>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                ...styles.listItem,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "black",
              }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => toggleTask(todo.id)}
              >
                {todo.text}
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => deleteTask(todo.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
  },
  title: { fontSize: "24px", marginBottom: "20px" },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "70%",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
  },
  filters: { marginBottom: "20px" },
  filterBtn: {
    margin: "0 5px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    background: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
  },
  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "5px",
  },
};

export default App;
