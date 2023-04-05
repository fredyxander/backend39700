import courseModel from "../models/course.model.js";

export default class CourseManager {
  constructor() {
    console.log("Working with courses using database");
  }

  getAll = async () => {
    const courses = await courseModel.find().lean();

    return courses;
  };

  create = async (course) => {
    const result = await courseModel.create(course);

    return result;
  };

  addStudent = async (courseId, studentId) => {
    const course = await courseModel.findById(courseId);

    course.students.push({ studentId });
    return course.save();
  };
}
