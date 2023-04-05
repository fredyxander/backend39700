import fs from "fs";
import __dirname from "../../utils.js";
import { getNextId } from "./utils.js";

const path = __dirname + "/dao/file-managers/files/courses.json";

export default class CourseManager {
  constructor() {
    console.log("Working with courses using filesystem");
  }

  getAll = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");

      return JSON.parse(data);
    }

    return [];
  };

  create = async (course) => {
    const courses = await this.getAll();

    const newCourse = {
      ...course,
      id: getNextId(courses),
    };

    const updatedCourses = [...courses, newCourse];

    await fs.promises.writeFile(path, JSON.stringify(updatedCourses));

    return newCourse;
  };
}
