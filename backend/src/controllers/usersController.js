import { db } from "../config/firebase.js";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = [];
    const usersSnapshot = await db.collection("users").get();

    usersSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Obtener usuario por ID
export const getUserByID = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const userDoc = db.collection("users").doc(userId);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ id: userSnapshot.id, ...userSnapshot.data() });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID." });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { userId, businessName, businessType, membership, name } = req.body;

    // Validar datos requeridos
    if (!userId || !businessName || !businessType || !membership || !name) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Comprobar si el usuario ya existe
    const userDoc = db.collection("users").doc(userId);
    const userSnapshot = await userDoc.get();

    if (userSnapshot.exists) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Crear el nuevo usuario
    const newUser = { businessName, businessType, membership, name };
    await userDoc.set(newUser);

    return res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user." });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const userDoc = db.collection("users").doc(userId);
    await userDoc.update(updatedData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userDoc = db.collection("users").doc(userId);
    await userDoc.delete();

    // Eliminar transacciones del usuario
    const financeCollection = userDoc.collection("finance");
    const transactions = await financeCollection.get();
    const batch = db.batch();

    transactions.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    res
      .status(200)
      .json({ message: "User and transactions deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
