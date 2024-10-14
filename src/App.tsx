import { useEffect, useState } from "react";
import "./App.css";
import { getTodos, saveTodo } from "./actions";
import { TodoList } from "./TodoList";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  const addTodo = async (newTodo: string) => {
    await saveTodo(newTodo);
    setTodos([...todos, newTodo as string]);
  };

  return <TodoList todos={todos} addTodo={addTodo} />;
}

export default App;
