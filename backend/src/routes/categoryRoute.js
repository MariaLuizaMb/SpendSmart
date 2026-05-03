import express from "express";
import CategoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, CategoryController.listar);
router.post("/", authMiddleware, CategoryController.cadastrar);
router.put("/editar/:id", authMiddleware, CategoryController.editar);
router.delete("/remover/:id", authMiddleware, CategoryController.remover);

export default router;
