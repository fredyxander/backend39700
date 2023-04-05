import mongoose from "mongoose";
import { students } from "./data.js";
import studentModel from "./students.model.js";

const insertStudents = async () => {
  await studentModel.insertMany(students);
};

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://Coder:mipassword12@codercluster.kvisivd.mongodb.net/aggregations?retryWrites=true&w=majority"
  );

  // await insertStudents();
  const resultOne = await studentModel.aggregate([{ $sort: { grade: -1 } }]);

  const resultTwo = await studentModel.aggregate([
    { $group: { _id: "$group", count: { $count: {} } } },
  ]);

  const resultThree = await studentModel.aggregate([
    { $match: { group: "1B" } },
    { $group: { _id: {}, avg: { $avg: "$grade" } } },
  ]);

  const resultFour = await studentModel.aggregate([
    { $match: { group: "1A" } },
    { $group: { _id: {}, avg: { $avg: "$grade" } } },
  ]);

  const resultFive = await studentModel.aggregate([
    { $group: { _id: {}, avg: { $avg: "$grade" } } },
  ]);

  const resultSix = await studentModel.aggregate([
    { $match: { gender: "Male" } },
    { $group: { _id: 0, avg: { $avg: "$grade" } } },
  ]);

  const resultSeven = await studentModel.aggregate([
    { $match: { gender: "Female" } },
    { $group: { _id: 0, avg: { $avg: "$grade" } } },
  ]);

  console.log(resultSeven);

  await mongoose.connection.close();
};

main();
