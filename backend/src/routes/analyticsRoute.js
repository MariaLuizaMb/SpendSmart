import { Router } from "express";
import AnalyticsController from "../controllers/analyticsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/preditiva",
  authMiddleware,
  AnalyticsController.obterAnalisePreditiva,
);

export default router;
