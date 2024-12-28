import express from "express";
import transactionsRoutes from "./transactionsRoutes.js";

const router = express.Router();

// Ruta base: /api/users
router.use(
  "/:userId/finance",
  (req, res, next) => {
    req.userId = req.params.userId; // Propaga el userId
    next();
  },
  transactionsRoutes
);

export default router;
