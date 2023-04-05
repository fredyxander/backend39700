import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.router.js";

const app = express();
app.use(express.json());
app.use("/api/users", usersRouter);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

mongoose.connect("connection-string").then((conn) => {
  console.log("Connected to DB!");
});
