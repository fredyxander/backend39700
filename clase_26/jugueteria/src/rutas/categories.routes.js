import {Router} from "express";
import { CategoryController } from "../controlador/categories.controller.js";

const router = Router();

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.saveCategory);

export {router as CategoryRouter};