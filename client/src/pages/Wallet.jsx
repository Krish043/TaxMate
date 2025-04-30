import React, { useState, useEffect } from "react";
import axios from "axios";

const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openingBalance, setOpeningBalance] = useState(""); // Manage opening balance input
  const [totalGST, setTotalGST] = useState(0); // Calculated total GST

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.BACKEND}/display`);
        if (response.data.success) {
          setWalletData(response.data.wallet);
        } else {
          setError("Failed to fetch wallet data.");
        }
      } catch (error) {
        setError("Error fetching wallet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  useEffect(() => {
    if (walletData) {
      const currentGST =
        walletData.cgst.reduce((acc, val) => acc + val, 0) +
        walletData.sgst.reduce((acc, val) => acc + val, 0) +
        walletData.igst.reduce((acc, val) => acc + val, 0);

      const blockedGST =
        walletData.blockedcgst.reduce((acc, val) => acc + val, 0) +
        walletData.blockedsgst.reduce((acc, val) => acc + val, 0) +
        walletData.blockedigst.reduce((acc, val) => acc + val, 0);

      const balance = openingBalance === "" ? 0 : Number(openingBalance); // Handle blank opening balance
      setTotalGST(balance + currentGST - blockedGST);
    }
  }, [walletData, openingBalance]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!walletData) return <div className="w-full h-full flex items-center">No wallet data available</div>;

  const totalBlockedCgst = walletData.blockedcgst.reduce((acc, val) => acc + val, 0);
  const totalBlockedSgst = walletData.blockedsgst.reduce((acc, val) => acc + val, 0);
  const totalBlockedIgst = walletData.blockedigst.reduce((acc, val) => acc + val, 0);

  const totalCurrentCgst = walletData.cgst.reduce((acc, val) => acc + val, 0);
  const totalCurrentSgst = walletData.sgst.reduce((acc, val) => acc + val, 0);
  const totalCurrentIgst = walletData.igst.reduce((acc, val) => acc + val, 0);

  const totalCurrentGST = totalCurrentCgst + totalCurrentSgst + totalCurrentIgst;
  const totalBlockedGST = totalBlockedCgst + totalBlockedSgst + totalBlockedIgst;

  const getPercentage = (part, total) => (total === 0 ? 0 : ((part / total) * 100).toFixed(2));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">Real Time GST Liability Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current GST Credits */}
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current GST Credits</h2>
          <p className="text-lg font-bold">CGST: ₹{totalCurrentCgst.toFixed(2)}</p>
          <p className="text-lg font-bold">SGST: ₹{totalCurrentSgst.toFixed(2) }</p>
          <p className="text-lg font-bold">IGST: ₹{totalCurrentIgst.toFixed(2) }</p>
          <div className="relative pt-4">
            <div className="h-6 bg-gray-400 rounded flex">
              <div
                className="h-6 bg-blue-600 rounded-l flex items-center justify-center"
                style={{ width: `${getPercentage(totalCurrentCgst, totalCurrentGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalCurrentCgst, totalCurrentGST)}%</span>
              </div>
              <div
                className="h-6 bg-green-600 flex items-center justify-center"
                style={{ width: `${getPercentage(totalCurrentSgst, totalCurrentGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalCurrentSgst, totalCurrentGST)}%</span>
              </div>
              <div
                className="h-6 bg-purple-600 rounded-r flex items-center justify-center"
                style={{ width: `${getPercentage(totalCurrentIgst, totalCurrentGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalCurrentIgst, totalCurrentGST)}%</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-300 text-sm mt-1">
              <span>CGST</span>
              <span>SGST</span>
              <span>IGST</span>
            </div>
          </div>
        </div>

        {/* Blocked GST Credits */}
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Blocked GST Credits</h2>
          <p className="text-lg font-bold">CGST: ₹{totalBlockedCgst}</p>
          <p className="text-lg font-bold">SGST: ₹{totalBlockedSgst}</p>
          <p className="text-lg font-bold">IGST: ₹{totalBlockedIgst}</p>
          <div className="relative pt-4">
            <div className="h-6 bg-gray-400 rounded flex">
              <div
                className="h-6 bg-blue-600 rounded-l flex items-center justify-center"
                style={{ width: `${getPercentage(totalBlockedCgst, totalBlockedGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalBlockedCgst, totalBlockedGST)}%</span>
              </div>
              <div
                className="h-6 bg-green-600 flex items-center justify-center"
                style={{ width: `${getPercentage(totalBlockedSgst, totalBlockedGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalBlockedSgst, totalBlockedGST)}%</span>
              </div>
              <div
                className="h-6 bg-purple-600 rounded-r flex items-center justify-center"
                style={{ width: `${getPercentage(totalBlockedIgst, totalBlockedGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalBlockedIgst, totalBlockedGST)}%</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-300 text-sm mt-1">
              <span>CGST</span>
              <span>SGST</span>
              <span>IGST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Balance Input and Total GST */}
      <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Total GST Calculation</h2>
        <label className="block text-gray-400 mb-2">Enter Opening Balance:</label>
        <input
          type="number"
          className="w-full bg-gray-800 text-gray-200 rounded-md p-2 mb-4"
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value.replace(/^0+/, ""))}
          placeholder="Enter opening balance"
        />
        <p className="text-2xl font-bold text-gray-200">
          Total GST: ₹{totalGST.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Wallet;
