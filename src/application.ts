import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import init from "./bootstrap";

init();

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(router);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  res.status(error.httpStatusCode || 500).json({
    message: error.message || "Internal Server Error",
    details: error.details || null,
  });
});

export { app };
