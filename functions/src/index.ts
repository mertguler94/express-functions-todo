import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { type Request, Response } from "express";
import todoRouter from "./routes/todos";

const app = express();
app.use(cors({ origin: true }));

// ping
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send(`Server is running, the time is: ${Date.now()}`);
});

app.use("/todos", todoRouter);

export const api = onRequest(app);
