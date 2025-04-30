const express = require("express");
const Wallet = require("../models/wallets"); // Assuming wallet model is in models folder
const router = express.Router();

router.post("/", async (req, res) => {
  const { mismatchedFromAcc, accData } = req.body;
  
  try {
      const mismatchedSuppliers = [...new Set([...mismatchedFromAcc])];
      
      // Initialize the totals for CGST, SGST, and IGST
      let totalCgst = 0;
      let totalSgst = 0;
      let totalIgst = 0;
      
    mismatchedSuppliers.forEach((supplier) => {
        const accRow = accData.find((row) => row["Supplier"] === supplier);
        
        if (accRow) {
            totalCgst += accRow["CGST"] || 0;
            totalSgst += accRow["SGST"] || 0;
            totalIgst += accRow["IGST"] || 0;
        }
    });
    
    // Check if a wallet for the given author (user) exists
    let wallet = await Wallet.findOne({ author: "c@gmail.com" }); // Replace with dynamic user ID or email
    
    if (wallet) {
      // If wallet exists, update the existing wallet
      wallet.cgst = totalCgst; // Update CGST
      wallet.sgst = totalSgst; // Update SGST
      wallet.igst = totalIgst; // Update IGST
    } else {
      // If wallet does not exist, create a new one
      wallet = new Wallet({
        author: "c@gmail.com", // Replace with the current user's ID or email
        cgst: wallet.Cgst, // Store the sum of CGST
        sgst: wallet.Sgst, // Store the sum of SGST
        igst: wallet.Igst, // Store the sum of IGST
      });
    }
    console.log(wallet);

    // Save the wallet (whether new or updated)
    await wallet.save();

    res.status(200).json({ success: true, wallet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
