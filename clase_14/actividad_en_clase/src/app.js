import express from "express";
import studentsRouter from "./routes/students.router.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use("/api/students", studentsRouter);

mongoose.connect("conn-string").then((conn) => {
  console.log("Connected to DB!");
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
