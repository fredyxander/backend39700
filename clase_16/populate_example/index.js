import mongoose from "mongoose";
import studentModel from "./models/student.model.js";
import courseModel from "./models/course.model.js";

const createStudent = async () => {
  await studentModel.create({
    first_name: "Ale",
    last_name: "Suarez",
    email: "ale@gmail.com",
    gender: "Male",
  });
};

const createCourse = async () => {
  await courseModel.create({
    title: "Programación backend",
    description: "Curso de programacion backend",
    difficulty: 5,
    topics: ["Node.js", "Express", "MongoDB"],
    professor: "Ale Suarez",
  });
};

const addCourseToStudent = async () => {
  const student = await studentModel.findById("641cdf2f14c6ce6f59841d3f");

  student.courses.push({ course: "641cdf2f14c6ce6f59841d41" });

  await student.save();
};

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://Coder:mipassword12@codercluster.kvisivd.mongodb.net/populate?retryWrites=true&w=majority"
  );

  // await createStudent()
  // await createCourse()
  // await addCourseToStudent()
  // const student = await studentModel
  //   .findById("641cdf2f14c6ce6f59841d3f")
  //   .populate("courses.course");

  const student = await studentModel.findById("641cdf2f14c6ce6f59841d3f");

  console.log(JSON.stringify(student, null, "\t"));

  await mongoose.connection.close();
};

main();
