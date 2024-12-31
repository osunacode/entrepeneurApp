import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";

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
app.use(transactionsRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 1506;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
