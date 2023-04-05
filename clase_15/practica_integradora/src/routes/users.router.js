import { Router } from "express";
import { UserManager } from "../dao/index.js";

const router = Router();
const userManager = new UserManager();

router.get("/", async (req, res) => {
  const users = await userManager.getAll();

  res.send(users);
});

router.post("/", async (req, res) => {
  const { first_name, last_name, email, birth_date, gender } = req.body;

  if (!first_name || !last_name || !email || !birth_date) {
    return res
      .status(400)
      .send({ status: "error", payload: "Missing parameters" });
  }

  const result = await userManager.create({
    first_name,
    last_name,
    email,
    birth_date,
    gender,
  });

  res.status(201).send({ status: "ok", payload: result });
});

export default router;
