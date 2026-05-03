import express from "express";
import LaunchController from "../controllers/launchController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para cadastrar lançamento (protegida por autenticação)
router.post("/cadastrar", authMiddleware, LaunchController.cadastrar);

// Rota para listar lançamentos (protegida por autenticação)
router.get("/listar", authMiddleware, LaunchController.listar);

// Rota para editar lançamento (protegida por autenticação)
router.put("/editar/:id", authMiddleware, LaunchController.editar);

// Rota para remover lançamento (protegida por autenticação)
router.delete("/remover/:id", authMiddleware, LaunchController.remover);

export default router;
