import { FormEvent, useState } from "react";
import "./App.css";

type TodoForm = HTMLFormElement & { todoItem: HTMLInputElement };

function App() {
  const [todos, setTodos] = useState<string[]>(["Buy milk", "Buy eggs"]);

  const onSubmit = (event: FormEvent<TodoForm>) => {
    event.preventDefault();
    setTodos([...todos, event.currentTarget.todoItem.value]);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input id="todoItem" type="text" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
