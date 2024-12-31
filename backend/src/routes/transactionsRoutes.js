import express from "express";
import {
  getTransactions,
  getTransactionByID,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Transactions Middleware: req.params`, req.params);
  next();
});

// Rutas para finanzas
router.get("/", getTransactions);
router.get("/:transactionId", getTransactionByID);
router.post("/", addTransaction);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;
