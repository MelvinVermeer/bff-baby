"use server";
import { revalidatePath } from "next/cache";

export const saveTodoAction = async (formData: FormData) => {
  const newTodo = formData.get("todoItem") as string;

  await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo: newTodo }),
  });

  revalidatePath("/");
};

export const getTodos = async () => {
  const response = await fetch("http://localhost:4000");
  return response.json();
};
