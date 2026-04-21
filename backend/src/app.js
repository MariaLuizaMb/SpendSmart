import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import launchRoutes from "./routes/launchRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/lancamentos", launchRoutes);

export default app;
