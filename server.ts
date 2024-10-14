import express, { Request, Response } from "express";
import cors from "cors";
import postgres from "postgres";

const app = express();
app.use(express.json());
app.use(cors());

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "allow",
});

const DELAY = 500;

app.get("/", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));

  const results = await sql`SELECT * FROM todos`;
  res.json(results.map((row) => row.todo));
});

app.post("/", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));

  await sql`INSERT INTO todos (todo) VALUES (${req.body.todo})`;
  res.sendStatus(201);
});

app.get("/reset", async (req: Request, res: Response) => {
  await sql`DELETE FROM todos`;
  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log(`Server running at http://localhost:${4000}`);
});
