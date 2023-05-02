import { Router } from "express";
import { getToysController, saveToyController } from "../controlador/juguetes.controller.js";

const router = Router();

//rutas de juguetes
router.get("/", getToysController);
router.post("/",saveToyController);


export {router as ToysRouter};