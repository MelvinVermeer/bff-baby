import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodoAction = async (formData: FormData) => {
    const newTodo = formData.get("todoItem");

    await fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    });

    setTodos([...todos, newTodo as string]);
  };

  return <TodoList todos={todos} addTodoAction={addTodoAction} />;
}

type TodoListProps = {
  addTodoAction: (formData: FormData) => Promise<void>;
  todos: string[];
};

const TodoList = ({ todos, addTodoAction }: TodoListProps) => {
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
};

export default App;
