import admin from "firebase-admin";
import { db } from "../config/firebase.js";

// Conseguir transacciones
export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId; // Ahora se toma desde req.userId

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const transactionsRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("finance");

    const snapshot = await transactionsRef.get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "No transactions found" });
    }

    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};

// Obtener transacción por ID
// Obtener transacción por ID
export const getTransactionByID = async (req, res) => {
  try {
    const userId = req.userId;
    const transactionId = req.transactionId || req.params.transactionId;
    console.log(
      `Fetching transaction for userId: ${userId}, transactionId: ${transactionId}`
    );

    if (!userId || !transactionId) {
      return res
        .status(400)
        .json({ error: "User ID and Transaction ID are required." });
    }

    const transactionRef = db
      .collection("users")
      .doc(userId)
      .collection("finance")
      .doc(transactionId);

    const transactionDoc = await transactionRef.get();

    if (!transactionDoc.exists) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.status(200).json({ id: transactionDoc.id, ...transactionDoc.data() });
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    res.status(500).json({ error: "Failed to fetch transaction by ID." });
  }
};

// Añadir transacción
export const addTransaction = async (req, res) => {
  try {
    const userId = req.userId; // Ahora se toma desde req.userId
    const { amount, description, type } = req.body;

    if (!userId || !amount || !description || !type) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const transactionsRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("finance");

    const newTransaction = {
      amount,
      date: new Date().toISOString(),
      description,
      type,
    };

    await transactionsRef.add(newTransaction);

    res.status(201).json({ message: "Transaction added successfully." });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Failed to add transaction." });
  }
};

// Actualizar una transacción
export const updateTransaction = async (req, res) => {
  const userId = req.userId;
  const transactionId = req.transactionId || req.params.transactionId;
  const transactionData = req.body;

  try {
    if (!userId || !transactionId) {
      return res
        .status(400)
        .json({ message: "Missing userId or transactionId." });
    }

    const transactionRef = db
      .collection("users")
      .doc(userId)
      .collection("finance")
      .doc(transactionId);
    const transactionDoc = await transactionRef.get();

    if (!transactionDoc.exists) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    await transactionRef.update(transactionData);

    res.status(200).json({ message: "Transaction updated successfully." });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Failed to update transaction." });
  }
};

// Eliminar una transacción
export const deleteTransaction = async (req, res) => {
  const userId = req.userId;
  const transactionId = req.transactionId || req.params.transactionId;

  try {
    if (!userId || !transactionId) {
      return res
        .status(400)
        .json({ message: "Missing userId or transactionId." });
    }

    const transactionRef = db
      .collection("users")
      .doc(userId)
      .collection("finance")
      .doc(transactionId);
    const doc = await transactionRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    await transactionRef.delete();
    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res
      .status(500)
      .json({ message: "Failed to delete transaction.", error: error.message });
  }
};
