import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const morgan = require("morgan");
require("dotenv").config();

// Create Express App
const app = express();

// Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error Connecting to DB", err));

// Apply Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// // error handler
// app.use(function (err, req, res, next) {
//   if (err.code !== "EBADCSRFTOKEN") return next(err);

//   // handle CSRF token errors here
//   res.status(403);
//   res.send("form tampered with");
// });

// Routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require(`./routes/${route}`))
);

app.get("/api/v1/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Port
const PORT = process.env.PORT || 8000;

// Listening Server
app.listen(PORT, function () {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
