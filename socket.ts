import * as https from "https";
import * as WebSocket from "ws";
import * as dotenv from "dotenv";
import * as http from "http";

var express = require("express");
const app = require("./app");

const admin_app = express();

const messageHandler = require("./messageHandler"); // Import the module

dotenv.config({
  path: `.env.${
    (process.env.NODE_ENV === "development" ? "local" : process.env.NODE_ENV) ||
    "local"
  }`,
  override: true,
});

const SocketServer = http.createServer(admin_app);

const wss = new WebSocket.Server({ server: SocketServer });

wss.on("connection", function connection(ws: any) {
  console.log("----------------------------------------");
  console.log(`Client connected`);
  console.log("----------------------------------------");
  messageHandler.setClientSocket(ws);

  ws.on("message", function message(data: any) {
    console.log(`${data}`);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

module.exports = SocketServer;
