import { Router } from "express";
import { urlencoded } from "express";

const router = Router();
router.use(urlencoded({ extended: true }));

let pets = [];

router.get("/", (req, res) => {
  res.send(pets);
});

router.post("/", (req, res) => {
  const newPet = {
    ...req.body,
  };

  pets = [...pets, newPet];

  res.send(newPet);
});

export default router;
