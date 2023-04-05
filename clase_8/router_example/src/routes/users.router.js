import { Router, json } from "express";

let users = [];

const usersRouter = Router();
usersRouter.use(json());

usersRouter.get("/", (req, res) => {
  res.send(users);
});

usersRouter.post("/", (req, res) => {
  const { username, email } = req.body;

  const newUser = { username, email };

  users = [...users, newUser];

  res.send(newUser);
});

export default usersRouter;
