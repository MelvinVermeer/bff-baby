export const saveTodo = async (newTodo: string) => {
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo: newTodo }),
  });
};

export const getTodos = async () => {
  const response = await fetch("http://localhost:4000");
  return response.json();
};
