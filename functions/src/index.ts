import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import { type Request, Response } from "express";

const app = express();

// ping
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`Server is running, the time is: ${Date.now()}`);
});

export const api = onRequest(app);
