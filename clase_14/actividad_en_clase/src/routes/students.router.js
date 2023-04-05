import { Router } from "express";
import studentModel from "../models/student.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const students = await studentModel.find();
    res.send({ result: "success", payload: students });
  } catch (e) {
    res.status(500).send({ result: "error", payload: e });
  }
});

router.post("/", async (req, res) => {
  const { nombre, apellido, edad, dni, curso, nota } = req.body;

  try {
    const createdStudent = await studentModel.create({
      nombre,
      apellido,
      dni,
      edad,
      curso,
      nota,
    });

    res.status(201).send({ result: "success", payload: createdStudent });
  } catch (err) {
    return res.status(500).send({ result: "error", payload: err.message });
  }
});

router.put("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const updatedStudentData = req.body;

  const updatedStudent = await studentModel.findOneAndUpdate(
    { _id: studentId },
    updatedStudentData,
    { new: true }
  );

  res.status(200).send({ result: "success", payload: updatedStudent });
});

router.delete("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  const result = await studentModel.deleteOne({ _id: studentId });

  res.status(200).send({ result: "success", payload: result });
});

export default router;
