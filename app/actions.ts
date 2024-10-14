"use server";
import { revalidatePath } from "next/cache";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export const saveTodoAction = async (formData: FormData) => {
  const newTodo = formData.get("todoItem") as string;

  await new Promise((resolve) => setTimeout(resolve, 500));

  await sql`INSERT INTO todos (todo) VALUES (${newTodo})`;

  revalidatePath("/");
};

export const getTodos = async () => {
  const results = await sql`SELECT * FROM todos`;
  return results.map((row) => row.todo);
};
