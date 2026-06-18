import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/cadastro", AuthController.cadastrar);
router.post("/login", AuthController.login);

router.delete("/excluir-conta", authMiddleware, AuthController.excluirConta);

export default router;
