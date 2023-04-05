import express from "express";
import viewsRouter from "../src/routes/views.router.js";
import usersRouter from "../src/routes/users.router.js";
import coursesRouter from "../src/routes/courses.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Routers
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);

mongoose.connect("conn-string").then((conn) => {
  console.log("Connected to DB!");
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
