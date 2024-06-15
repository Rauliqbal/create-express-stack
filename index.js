import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { Database } from "./src/Database/index.js";
import chalk from "chalk";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect To Database
Database(process.env.DATABASE_URL);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome! to my server👋🏻",
  });
});

// PORT
const port = 3000;
app.listen(port, () =>
  console.log(
    `${chalk.bgGreen(" INFO ")} Server running on ${chalk.blue.bold(
      `http://localhost:${port}`
    )}`
  )
);
