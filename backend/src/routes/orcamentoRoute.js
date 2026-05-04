import { Router } from "express";
import OrcamentoController from "../controllers/orcamentoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, OrcamentoController.cadastrar);
router.get("/", authMiddleware, OrcamentoController.listar);
router.get("/:id", authMiddleware, OrcamentoController.buscarPorId);
router.put("/:id", authMiddleware, OrcamentoController.editar);
router.delete("/:id", authMiddleware, OrcamentoController.remover);

export default router;
