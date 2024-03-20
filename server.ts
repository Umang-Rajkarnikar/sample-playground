// const SocketServer = require("./socket");
const app = require("./app");

const appPort = process.env.PORT || 8080;
// const socketPort = process.env.SOCKET_PORT || 1549;

// SocketServer.listen(socketPort, () => {
//   console.log(`Listening on port: ${socketPort}`);
// });

app.listen(appPort, () => {
  console.log(`[Server]: I am running at https://localhost:${appPort}`);
});
