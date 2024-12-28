import admin from "../config/firebaseConfig.js";

export const checkMembership = async (req, res, next) => {
  const { userId } = req.params;

  try {
    console.log("Checking membership for userId:", userId);

    // Accede al documento del usuario
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      console.log("User not found in Firestore");
      return res.status(404).json({ message: "User not found." });
    }

    const { membership } = userDoc.data();

    console.log("User membership:", membership);

    if (membership !== "premium") {
      console.log("Access denied. Membership is not premium.");
      return res
        .status(403)
        .json({ message: "Access denied. Upgrade to premium membership." });
    }

    next();
  } catch (error) {
    console.error("Error checking membership:", error.message);
    res.status(500).json({ message: "Membership check failed." });
  }
};
