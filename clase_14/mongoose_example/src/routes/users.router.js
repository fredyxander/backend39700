import { Router } from "express";
import userModel from "../models/user.model.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const users = await userModel.find();

  res.send({ status: "ok", payload: users });
});

usersRouter.post("/", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    const createdUser = await userModel.create({
      first_name,
      last_name,
      email,
    });

    res.status(201).send({ status: "ok", payload: createdUser });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

usersRouter.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    updatedUserData,
    { new: true }
  );

  res.status(200).send({ status: "ok", payload: updatedUser });
});

usersRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await userModel.deleteOne({ _id: userId });

  res.status(200).send({ status: "ok", payload: result });
});

export default usersRouter;
