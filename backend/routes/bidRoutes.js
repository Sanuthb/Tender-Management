const express = require("express");
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Submit a bid (Supplier)
router.post("/:tenderId", authMiddleware, roleMiddleware(["supplier"]), async (req, res) => {
  const { tenderId } = req.params;
  const { amount, message } = req.body;

  try {
    const bid = await prisma.bid.create({
      data: { amount, message, tenderId, userId: req.user.id },
    });
    res.json(bid);
  } catch (error) {
    res.status(500).json({ error: "Error submitting bid" });
  }
});

// View bids for a tender (Admin/Buyer)
router.get("/:tenderId", async (req, res) => {
  try {
    const bids = await prisma.bid.findMany({
      where: { tenderId: req.params.tenderId },
      include: { user: true },
    });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bids" });
  }
});

router.patch("/:bidId", authMiddleware, async (req, res) => {
  const { bidId } = req.params;
  const { status } = req.body;

  try {
    // Check if the bid exists
    const bid = await prisma.bid.findUnique({
      where: { id: bidId },
    });

    if (!bid) {
      return res.status(404).json({ error: "Bid not found" });
    }

    // Ensure the status is valid
    const validStatuses = ["pending", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Update the bid status
    const updatedBid = await prisma.bid.update({
      where: { id: bidId },
      data: { status },
    });

    res.json({ message: "Bid status updated successfully", bid: updatedBid });
  } catch (error) {
    console.error("Error updating bid status:", error);
    res.status(500).json({ error: "Failed to update bid status" });
  }
});

module.exports = router;
