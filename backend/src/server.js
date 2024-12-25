import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import transactionsRoutes from "./routes/transactionsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/transactions", transactionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
