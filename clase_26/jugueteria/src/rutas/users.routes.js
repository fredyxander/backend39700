import { Router } from "express";
import { getUsersController } from "../controlador/users.controller.js";

const router = Router();

router.get("/", getUsersController);

export { router as usersRouter};