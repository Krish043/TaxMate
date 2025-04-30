// const mongoose = require("mongoose");

// const walletSchema = new mongoose.Schema({
//   author: {
//     type: String, // Reference to the User model
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   cgst: {
//     type: [Number], // Array of numbers
//     required: true,
//   },
//   sgst: {
//     type: [Number], // Array of numbers
//     required: true,
//   },
//   igst: {
//     type: [Number], // Array of numbers
//     required: true,
//   },
//   blocked: {
//     type: [Number], // Array of strings
//     required: true,
//   },
// });

// const Wallet = mongoose.model("Wallet", walletSchema);

// module.exports = Wallet;


const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  author: {
    type: String, // Reference to the User model
    required: true,
  },
  image: {
    type: String,
  },
  cgst: {
    type: [Number],
    required: true,
  },
  sgst: {
    type: [Number],
    required: true,
  },
  igst: {
    type: [Number],
    required: true,
  },
  blockedcgst: {
    type: [Number], // Array of blocked CGST amounts
    required: true,
  },
  blockedsgst: {
    type: [Number], // Array of blocked SGST amounts
    required: true,
  },
  blockedigst: {
    type: [Number], // Array of blocked SGST amounts
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
