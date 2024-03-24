// import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as WebSocket from "ws";

import bodyParser from "body-parser";
import * as http from "http";
import * as https from "https";

const express = require("express");
const messageHandler = require("./messageHandler"); // Import the module

dotenv.config({
  path: `.env.${
    (process.env.NODE_ENV === "development" ? "local" : process.env.NODE_ENV) ||
    "local"
  }`,
  override: true,
});

const app = express();

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

app.get("/", (req: any, res: any) => {
  res.send("Hello, this is Express + TypeScript");
});

// const SocketServer = https.createServer(
//   {
//     cert: process.env.SOCKET_CERT,
//     key: process.env.SOCKET_KEY,
//   },
//   app
// );

// const SocketServer = http.createServer(app);

// const wss = new WebSocket.Server({ server: SocketServer });

// wss.on("connection", function connection(ws: any) {
//   console.log("----------------------------------------");
//   console.log(`Client connected`);
//   console.log("----------------------------------------");
//   messageHandler.setClientSocket(ws);

//   ws.on("message", function message(data: any) {
//     console.log(`${data}`);
//   });

//   ws.on("close", function close() {
//     console.log("Client disconnected");
//   });
// });

module.exports = app;
