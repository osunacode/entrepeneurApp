import admin from "firebase-admin";

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json"),
});

// Generar token para un UID de usuario
const uid = "111421187321507263129"; // Sustituye por el UID real del usuario
admin
  .auth()
  .createCustomToken(uid)
  .then((token) => {
    console.log("Token:", token);
  })
  .catch((error) => {
    console.error("Error al generar token:", error);
  });
