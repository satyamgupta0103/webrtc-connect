require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const Routes = require("./app/routes");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  Routes,
]);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
