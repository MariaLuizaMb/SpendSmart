import express from "express";
import LaunchController from "../controllers/launchController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para cadastrar lançamento (protegida por autenticação)
router.post("/cadastrar", authMiddleware, LaunchController.cadastrar);

export default router;
