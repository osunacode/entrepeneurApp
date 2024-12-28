export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Token en "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Token no proporcionado." });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("UID del token:", decodedToken.uid); // Verificar el UID
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(403).json({ error: "Token inválido o expirado." });
  }
};
