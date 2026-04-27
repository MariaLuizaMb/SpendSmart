import express from "express";
import CategoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, CategoryController.listar);
router.post("/", authMiddleware, CategoryController.cadastrar);

export default router;
