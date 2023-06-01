import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todos";

const router = express.Router();

router.get("/", getAllTodos);

router.get("/:id", getTodoById);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
