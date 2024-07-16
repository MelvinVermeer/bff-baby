import { useEffect, useOptimistic, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = async (newTodo: string) => {
    await fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    });

    setTodos([...todos, newTodo as string]);
  };

  return <TodoList todos={todos} addTodo={addTodo} />;
}

type TodoListProps = {
  addTodo: (newTodo: string) => Promise<void>;
  todos: string[];
};

const TodoList = ({ todos, addTodo }: TodoListProps) => {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, newTodo: string) => {
      return [...current, newTodo];
    }
  );

  const submitAction = async (formData: FormData) => {
    const newTodo = formData.get("todoItem") as string;
    addOptimisticTodo(newTodo);
    await addTodo(newTodo);
  };

  return (
    <div>
      <form action={submitAction}>
        <input name="todoItem" type="text" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
