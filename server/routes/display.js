const express = require("express");
const Wallet = require("../models/wallets"); // Assuming wallet model is in models folder
const router = express.Router();

// Route to get wallet data
router.get("/", async (req, res) => {
  try {
    // Assuming you want the data for a specific user, filter by 'author'
    const wallet = await Wallet.findOne({ author: "c@gmail.com" }); // Replace with dynamic user ID

    if (!wallet) {
      return res.status(404).json({ success: false, message: "Wallet not found" });
    }

    // Send the wallet data back as response
    res.status(200).json({ success: true, wallet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
