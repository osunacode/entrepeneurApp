import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import transactionsRoutes from "./routes/transactionsRoutes.js"; // Rutas para las transacciones
import userRoutes from "./routes/userRoutes.js";
import serviceAccountKey from "./config/serviceAccountKey.json" assert { type: "json" }; // Archivo de clave JSON

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://<your-database-name>.firebaseio.com", // Sustituye por tu base de datos
});

// Configuración del servidor
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para registrar la URL y el método de cada request
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);
  next();
});

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/users/:userId/finance", transactionsRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 1506;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
