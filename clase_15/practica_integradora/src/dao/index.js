import FileUserManager from "./file-managers/user.manager.js";
import DbUserManager from "./db-managers/user.manager.js";
import FileCourseManager from "./file-managers/course.manager.js";
import DbCourseManager from "./db-managers/course.manager.js";

const config = {
  persistenceType: "db",
};

let UserManager, CourseManager;

if (config.persistenceType === "db") {
  UserManager = DbUserManager;
  CourseManager = DbCourseManager;
} else if (config.persistenceType === "file") {
  UserManager = FileUserManager;
  CourseManager = FileCourseManager;
} else {
  throw new Error("Unknown persistence type");
}

export { UserManager, CourseManager };
