import express from "express";
import {
  getTransactions,
  addTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

// Middleware de depuración
router.use((req, res, next) => {
  console.log("Transactions Middleware: userId", req.userId); // Ahora debe mostrar el userId correcto
  next();
});

// Rutas para finanzas
router.get("/", getTransactions);
router.post("/", addTransaction);

export default router;
