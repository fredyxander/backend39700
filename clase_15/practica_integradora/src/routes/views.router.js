import { Router } from "express";
import { CourseManager } from "../dao/index.js";
import { UserManager } from "../dao/index.js";

const router = Router();
const userManager = new UserManager();
const courseManager = new CourseManager();

router.get("/users", async (req, res) => {
  const users = await userManager.getAll();

  res.render("users", { users });
});

router.get("/courses", async (req, res) => {
  const courses = await courseManager.getAll();

  res.render("courses", { courses });
});

export default router;
