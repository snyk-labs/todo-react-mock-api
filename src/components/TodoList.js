import axios from "axios";
import { useState } from "react";

function TodoList({ todos, setTodos, handleSubmit, setUserTodo, userTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ title: "", id: "" });

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    axios.delete(`api/todos/${id}`);
  };

  // Hello, this is the functionality for the patch request and I believe it runs successfully. You can check the data from the server by chaining the .then request again to affirm that :). I added a little styling, see if you'll like :)
  const updateTodo = (title, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    setTodos(newTodos);
    axios.patch(`api/todos/${id}`);
  };

  const handleCheckState = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="todos">
      <h1>Todo List</h1>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <input
              value={todo.title}
              className="px-3 todo-text-input"
              onChange={(e) => updateTodo(e.target.value, todo.id)}
            />

            <div className="btncontainer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckState(todo.id)}
              />

              <button className="close" onClick={() => deleteTodo(todo.id)}>
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="todo-form">
        {" "}
        <input
          className="input-field"
          value={userTodo}
          onChange={(e) => setUserTodo(e.target.value)}
          placeholder="Enter your todo"
          type="text"
        />
        <button type="submit"> &#10003;</button>{" "}
      </form>
    </div>
  );
}

export default TodoList;
