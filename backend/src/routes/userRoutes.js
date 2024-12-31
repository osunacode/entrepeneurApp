import express from "express";
import {
  getUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";
import transactionsRoutes from "./transactionsRoutes.js";

const router = express.Router();

// Rutas para usuarios
router.get("/", getUsers);
router.get("/:userId", getUserByID);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

// Ruta base: /api/users
router.use(
  "/:userId/finance",
  (req, res, next) => {
    req.userId = req.params.userId; // Propaga el userId
    next();
  },
  (req, res, next) => {
    if (req.params.transactionId) {
      req.transactionId = req.params.transactionId; // Propaga el transactionId si está presente
    }
    next();
  },
  transactionsRoutes
);

export default router;
