import "dotenv/config.js";
import app from "./app.js";
import { startFinancialAnalysisWorker } from "./jobs/workers/financialAnalysisWorker.js";
import { startBudgetAlertWorker } from "./jobs/workers/budgetAlertWorker.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

startFinancialAnalysisWorker();
startBudgetAlertWorker();
