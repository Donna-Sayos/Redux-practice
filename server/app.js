require("dotenv").config({ path: "./server/config/.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const logger = require("./logger/index");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(express.static(path.join(__dirname, "..", "dist")));

//routes
app.use("/api/v1/todos", require("./routers/todoRoute"));

// when the ROOT url path is requested, this sends the index.html file to the client
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"));
});

// prevents unauthorized access to files on the server
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    const error = new Error("Not fount 🫤");
    error.status = 404;
    next(error);
  } else {
    next();
  }
});

// handler for ALL url paths that do not match any routes
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html")); // just send the index.html file to the client
});

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

module.exports = app;
