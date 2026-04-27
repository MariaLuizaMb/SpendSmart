import { Router } from "express";
import BankAccountController from "../controllers/bankAccountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, BankAccountController.listar);
router.post("/", authMiddleware, BankAccountController.cadastrar);

export default router;
