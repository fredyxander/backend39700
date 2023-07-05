import { Router } from "express";

const router = Router();

let users = [];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const newUser = req.body;

  users = [...users, newUser];

  res.send(newUser);
});

export default router;
