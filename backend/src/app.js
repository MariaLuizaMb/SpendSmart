import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import bankAccountRoutes from "./routes/bankAccountRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
import launchRoutes from "./routes/launchRoute.js";
import orcamentoRoutes from "./routes/orcamentoRoute.js";
import analyticsRoutes from "./routes/analyticsRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";

const app = express();

app.disable("x-powered-by");

const DEFAULT_CORS_ORIGINS = ["http://localhost:5173"];

function getAllowedCorsOrigins() {
  const origins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : DEFAULT_CORS_ORIGINS;

  return origins.map((origin) => origin.trim()).filter(Boolean);
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      callback(null, getAllowedCorsOrigins().includes(origin));
    },
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/contas", bankAccountRoutes);
app.use("/categorias", categoryRoutes);
app.use("/lancamentos", launchRoutes);
app.use("/orcamentos", orcamentoRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/notifications", notificationRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.statusCode || 500).json({
    erro: error.message || "Erro interno do servidor.",
    codigo: error.code || "UNEXPECTED_ERROR",
  });
});

export default app;
