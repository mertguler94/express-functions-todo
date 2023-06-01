import db from "../config/db";
import { TodoType } from "../models/Todo";
import { Route } from "../types/Route";

export const getAllTodos: Route = async (req, res) => {
  try {
    const fsRes = await db.collection("/todos").get();

    const allDocs = fsRes.docs.map((doc) => doc.data());
    return res.status(200).json({ message: "OK", data: allDocs });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
};

export const getTodoById: Route = async (req, res) => {
  const todoId = req.params.id;

  try {
    const fsDoc = (await db.collection("/todos").doc(todoId).get()).data();

    if (!fsDoc) {
      return res.status(404).json({ message: "Doc could not be found." });
    }

    return res.status(200).json({ message: "OK", data: fsDoc });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
};

export const createTodo: Route = async (req, res) => {
  const todo = req.body as TodoType;
  if (!todo) return res.status(404).send("Body cannot be found.");

  try {
    const newEntry = db.collection("todos").doc();

    const newTodo: TodoType = {
      ...todo,
      id: newEntry.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await newEntry.set(newTodo);
    return res.status(200).json({ message: "OK", data: newTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
};

export const updateTodo: Route = async (req, res) => {
  const todoId = req.params.id;
  const reqBody = req.body;

  try {
    const fsRes = db.collection("/todos").doc(todoId);

    const fsDoc = (await fsRes.get()).data();
    if (!fsDoc) {
      return res.status(404).json({ message: "Doc could not be found." });
    }

    await fsRes.update({ ...reqBody, updatedAt: Date.now() });

    const updatedDoc = (await db.collection("/todos").doc(todoId).get()).data();

    if (!updatedDoc) {
      return res.status(500).json({ message: "Something went wrong." });
    }

    return res.status(200).json({ message: "doc updated", data: updatedDoc });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
};

export const deleteTodo: Route = async (req, res) => {
  const todoId = req.params.id;

  try {
    const fsRes = await db.collection("/todos").doc(todoId);

    const fsDoc = await (await fsRes.get()).data();
    if (!fsDoc) {
      return res.status(404).json({ message: "Doc could not be found." });
    }

    fsRes.delete();

    return res.status(200).json({ message: "doc deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong." });
  }
};
