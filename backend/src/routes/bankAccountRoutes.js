import { Router } from "express";
import BankAccountController from "../controllers/bankAccountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/contas", authMiddleware, BankAccountController.cadastrar);

export default router;
