import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

import bodyParser from "body-parser";

dotenv.config({
  path: `.env.${
    (process.env.NODE_ENV === "development" ? "local" : process.env.NODE_ENV) ||
    "local"
  }`,
  override: true,
});

const app: Express = express();

const cors = require("cors");

const pingRoute = require("./routes/ping");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect routes to app
app.use("/ping", pingRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

module.exports = app;
