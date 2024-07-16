import { getTodos } from "./actions";
import React from "react";
import { TodoList } from "./TodoList";

async function Page() {
  const todos = await getTodos();
  return <TodoList todos={todos} />;
}

export default Page;
