import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post("/cadastro", AuthController.cadastrar);
router.post("/login", AuthController.login);

export default router;
