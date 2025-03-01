const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient"); 
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: req.user.id },
//       select: { id: true, name: true, email: true, role: true },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Failed to fetch user details" });
//   }
// });
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const userId = req.params.id.toString(); // Convert ID to String

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});


module.exports = router;
