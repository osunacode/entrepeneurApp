import express from "express";
import {
  getTransactions,
  getTransactionByID,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

// Rutas para finanzas
router.get("/", getTransactions);
router.get("/:transactionId", getTransactionByID);
router.post("/", addTransaction);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;
