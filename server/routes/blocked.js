// const express = require("express");
// const Wallet = require("../models/wallets"); // Assuming wallet model is in the models folder
// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { CGST, SGST, IGST } = req.body; // Extract CGST, SGST, IGST from request body

//   try {
//     // Initialize variables to store the totals for CGST, SGST, IGST
//     let totalCgst = 0;
//     let totalSgst = 0;
//     let totalIgst = 0;

//     // Sum up CGST and SGST values
//     totalCgst += CGST || 0; // Add CGST to total
//     totalSgst += SGST || 0; // Add SGST to total
//     totalIgst += IGST || 0;

//     // Save the calculated totals to the database
//     const wallet = new Wallet({
//       author: "c@gmail.com", // Replace with the current user's ID or email
//       blockedcgst: totalCgst, // Store the sum of CGST
//       blockedsgst: totalSgst, // Store the sum of SGST
//       blockedigst: totalIgst
//     });

//     await wallet.save();

//     res.status(200).json({ success: true, wallet });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const Wallet = require("../models/wallets"); // Assuming wallet model is in the models folder
const router = express.Router();

router.post("/", async (req, res) => {
  const { CGST, SGST, IGST } = req.body; // Extract CGST, SGST, IGST from request body

  try {
    // Initialize variables to store the totals for CGST, SGST, IGST
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    // Sum up CGST and SGST values
    totalCgst += CGST || 0; // Add CGST to total
    totalSgst += SGST || 0; // Add SGST to total
    totalIgst += IGST || 0;

    // Check if a wallet for the given author (user) exists
    let wallet = await Wallet.findOne({ author: "c@gmail.com" }); // Replace with dynamic user ID or email

    if (wallet) {
      // If wallet exists, update the existing wallet
      wallet.blockedcgst = totalCgst; // Update blocked CGST
      wallet.blockedsgst = totalSgst; // Update blocked SGST
      wallet.blockedigst = totalIgst; // Update blocked IGST
    } else {
      // If wallet does not exist, create a new one
      wallet = new Wallet({
        author: "c@gmail.com", // Replace with user ID or name from your system
        blockedcgst: totalCgst, // Store the sum of CGST
        blockedsgst: totalSgst, // Store the sum of SGST
        blockedigst: totalIgst  // Store the sum of IGST
      });
    }

    // Save the wallet (whether new or updated)
    await wallet.save();

    res.status(200).json({ success: true, wallet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
