import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = express.Router({ mergeParams: true });

// Middleware para propagar userId y productId
router.use((req, res, next) => {
  console.log(`Products Middleware: req.params`, req.params);
  req.userId = req.params.userId;
  req.productId = req.params.productId;
  next();
});

// Rutas para productos
router.get("/", getAllProducts); // GET /api/users/:userId/products
router.get("/:productId", getProductById); // GET /api/users/:userId/products/:productId
router.post("/", createProduct); // POST /api/users/:userId/products
router.put("/:productId", updateProduct); // PUT /api/users/:userId/products/:productId
router.delete("/:productId", deleteProduct); // DELETE /api/users/:userId/products/:productId

export default router;
