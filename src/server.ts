import express from "express";
import { initDB } from "./bootstrap/index";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
