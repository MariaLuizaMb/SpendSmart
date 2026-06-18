import { Router } from "express";

import NotificationController from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, NotificationController.listar);
router.patch("/read-all", authMiddleware, NotificationController.marcarTodasComoLidas);
router.patch("/:id/read", authMiddleware, NotificationController.marcarComoLida);

export default router;
