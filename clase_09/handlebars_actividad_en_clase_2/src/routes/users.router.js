import express from "express";

const router = express.Router();
const users = [];

router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  const newUser = {
    username,
    email,
    password,
  };

  users.push(newUser);

  res.send(newUser);
});

router.get("/", (req, res) => {
  res.send(users);
});

export default router;
