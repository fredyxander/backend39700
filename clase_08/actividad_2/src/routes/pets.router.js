import { Router } from "express";
import { urlencoded } from "express";
import { uploader } from "../file-uploads.js";

const router = Router();
router.use(urlencoded({ extended: true }));

let pets = [];

router.get("/", (req, res) => {
  res.send(pets);
});

router.post("/", uploader.single("file"), (req, res) => {
  console.log(req.file);

  const newPet = {
    ...req.body,
    thumbnail: req.file.path,
  };

  pets = [...pets, newPet];

  res.send(newPet);
});

export default router;
