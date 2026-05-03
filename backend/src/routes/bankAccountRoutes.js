import { Router } from "express";
import BankAccountController from "../controllers/bankAccountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, BankAccountController.listar);
router.post("/", authMiddleware, BankAccountController.cadastrar);
router.put("/editar/:id", authMiddleware, BankAccountController.editar);
router.delete("/remover/:id", authMiddleware, BankAccountController.remover);

export default router;
