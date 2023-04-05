import { Router } from "express";
import { CourseManager } from "../dao/index.js";

const router = Router();
const courseManager = new CourseManager();

router.get("/", async (req, res) => {
  const courses = await courseManager.getAll();

  res.send(courses);
});

router.post("/", async (req, res) => {
  const { title, description, teacher } = req.body;

  if (!title || !description || !teacher) {
    return res
      .status(400)
      .send({ status: "error", payload: "Missing parameters" });
  }

  const result = await courseManager.create({
    title,
    description,
    teacher,
    students: [],
  });

  res.status(201).send({ status: "ok", payload: result });
});

router.post("/:courseId/:userId", async (req, res) => {
  const { courseId, userId } = req.params;

  const result = await courseManager.addStudent(courseId, userId);

  res.send({ status: "ok", payload: result });
});

export default router;
