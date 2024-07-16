import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const todos = ["Buy milk", "Buy eggs", "Buy bread"];

const DELAY = 500;

app.get("/", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  res.json(todos);
});

app.post("/", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  req.body.todo && todos.push(req.body.todo);
  res.sendStatus(201);
});

app.listen(4000, () => {
  console.log(`Server running at http://localhost:${4000}`);
});
