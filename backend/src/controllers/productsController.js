import { db } from "../config/firebase.js";

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, stock, description } = req.body;

    if (!userId || !name || !stock || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const productsRef = db
      .collection("users")
      .doc(userId)
      .collection("products");

    const newProduct = {
      name,
      stock,
      description,
    };

    await productsRef.add(newProduct);

    res.status(201).json({ message: "Product created successfully." });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product." });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const productsRef = db
      .collection("users")
      .doc(userId)
      .collection("products");
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No products found." });
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.productId || req.params.productId;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "User ID and Product ID are required." });
    }

    const productRef = db
      .collection("users")
      .doc(userId)
      .collection("products")
      .doc(productId);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product by ID." });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.productId || req.params.productId;

    const productData = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "User ID and Product ID are required." });
    }

    const productRef = db
      .collection("users")
      .doc(userId)
      .collection("products")
      .doc(productId);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: "Product not found." });
    }

    await productRef.update(productData);

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product." });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.productId || req.params.productId;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "User ID and Product ID are required." });
    }

    const productRef = db
      .collection("users")
      .doc(userId)
      .collection("products")
      .doc(productId);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: "Product not found." });
    }

    await productRef.delete();

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product." });
  }
};
