import express, { Request, Response } from "express";
// import { TodoType } from "../models/Todo";
import admin from "firebase-admin";

import serviceAccount from ("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const router = express.Router();

// get all todos

router.get("/todos", (req: Request, res: Response) => {});

// get a todo by id

router.get("/todos/:id", (req: Request, res: Response) => {});

// post a todo

router.post("/todos", (req: Request, res: Response) => {});

// update a todo

router.put("/todos/:id", (req: Request, res: Response) => {});

// delete a todo

router.delete("/todos/:id", (req: Request, res: Response) => {});
