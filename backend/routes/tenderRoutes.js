const express = require("express");
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get('/',async (req,res)=>{
  try{
    const tenders = await prisma.tender.findMany({
      where: { status: "open" },
    });
    res.json(tenders);
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch tenders" });
  }
})


router.get("/specifictender", authMiddleware, async (req, res) => {
  try {
    // Ensure only buyers can access this route
    if (req.user.role !== "buyer") {
      return res.status(403).json({ error: "Access denied" });
    }

    // Fetch tenders that belong to the logged-in buyer
    const tenders = await prisma.tender.findMany({
      where: { userId: req.user.id },
      include: { bids: true },
    });

    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tenders" });
  }
});


// Get tenders assigned to a supplier
router.get("/assigned", authMiddleware, roleMiddleware(["supplier"]), async (req, res) => {
  try {
    const tenders = await prisma.tender.findMany({
      where: {
        bids: { some: { userId: req.user.id, status: "accepted" } },
      },
      include: { bids: true },
    });

    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assigned tenders" });
  }
});

// POST a new tender (Only Buyer can post tenders)
router.post("/", authMiddleware, roleMiddleware(["buyer"]), async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const tender = await prisma.tender.create({
      data: {
        title,
        description,
        userId: req.user.id, 
        status: "open", 
      },
    });

    res.status(201).json(tender);
  } catch (error) {
    res.status(500).json({ error: "Failed to post the tender" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tender = await prisma.tender.findUnique({
      where: { id: id }, // Ensure ID is an integer
      include: { bids: true }, // Include bids if needed
    });

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    res.json(tender);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the tender" });
  }
});

// Submit a bid (Only Supplier can bid)
router.post("/:tenderId/bid",authMiddleware,async (req, res) => {
  const { tenderId } = req.params;
  const { message,amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Bid amount is required" });
  }

  try {
    // Check if the tender exists and is open
    const tender = await prisma.tender.findUnique({
      where: { id: tenderId},
    });

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    if (tender.status !== "open") {
      return res.status(400).json({ error: "Cannot bid on a closed tender" });
    }

    // Create a new bid
    const bid = await prisma.bid.create({
      data: {
        message:message,
        amount: parseFloat(amount),
        userId: req.user.id, // Logged-in supplier's ID
        tenderId: tenderId,
      },
    });

    res.status(201).json({ message: "Bid placed successfully", bid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Failed to place bid" });
  }
});

router.patch('/close/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTender = await prisma.tender.update({
      where: { id: id},
      data: { status: "closed" }
    });

    res.json({ message: "Tender closed successfully", tender: updatedTender });
  } catch (error) {
    res.status(500).json({ error: "Failed to close tender" });
  }
});



module.exports = router;
