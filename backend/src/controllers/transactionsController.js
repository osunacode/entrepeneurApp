import admin from "firebase-admin";

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
