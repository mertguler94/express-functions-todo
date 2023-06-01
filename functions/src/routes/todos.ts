import express, { Request, Response } from "express";
import db from "../config/db";
import { TodoType } from "../models/Todo";
// import { TodoType } from "../models/Todo";

const router = express.Router();

// get all todos

router.get("/", async (req: Request, res: Response) => {
  try {
    const fsRes = await db.collection("/todos").get();
    return res.status(200).json({ message: "OK", data: fsRes.docs });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
});

// get a todo by id

// router.get("/todos/:id", (req: Request, res: Response) => {});

// post a todo

router.post("/", async (req: Request, res: Response) => {
  const todo = req.body as TodoType;
  if (!todo) return res.status(404).send("Body cannot be found.");

  const newTodo: TodoType = {
    ...todo,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  try {
    const fsRes = await db.collection("todos").doc().create(newTodo);
    return res.status(200).json({ message: "OK", data: fsRes });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
});

// update a todo

// router.put("/todos/:id", (req: Request, res: Response) => {});

// delete a todo

// router.delete("/todos/:id", (req: Request, res: Response) => {});

export default router;
