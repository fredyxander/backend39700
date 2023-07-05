import { Router, json } from "express";

let pets = [];

const petsRouter = Router();
petsRouter.use(json());

petsRouter.get("/", (req, res) => {
  res.send(pets);
});

petsRouter.post("/", (req, res) => {
  const { name, species } = req.body;

  const newPet = { name, species };

  pets = [...pets, newPet];

  res.send(newPet);
});

export default petsRouter;
