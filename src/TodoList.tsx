import { useOptimistic } from "react";

type TodoListProps = {
  addTodo: (newTodo: string) => Promise<void>;
  todos: string[];
};

export const TodoList = ({ todos, addTodo }: TodoListProps) => {
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
