import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>(["Buy milk", "Buy eggs"]);

  const addTodoAction = (formData: FormData) => {
    const newTodo = formData.get("todoItem");
    setTodos([...todos, newTodo as string]);
  };

  return (
    <div>
      <form action={addTodoAction}>
        <input name="todoItem" type="text" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
