import express from "express";
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../controller/TodoController.js";

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.post('/todos', createTodo);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;