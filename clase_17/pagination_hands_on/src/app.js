import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import studentModel from "./models/student.model.js";

const app = express();
mongoose
  .connect(
    "mongodb+srv://Coder:mipassword12@codercluster.kvisivd.mongodb.net/aggregations?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  });

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/students", async (req, res) => {
  const { page } = req.query;

  const students = await studentModel.paginate(
    {},
    {
      limit: 5,
      lean: true,
      page: page ?? 1,
    }
  );

  res.render("students", { students });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
