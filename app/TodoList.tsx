"use client";

import { useOptimistic } from "react";
import React from "react";
import { saveTodoAction } from "./actions";

type TodoListProps = {
  todos: string[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, newTodo: string) => {
      return [...current, newTodo];
    }
  );

  const submitAction = async (formData: FormData) => {
    const newTodo = formData.get("todoItem") as string;
    addOptimisticTodo(newTodo);
    saveTodoAction(formData);
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
