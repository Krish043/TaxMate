  import React, { useState } from "react";
  import * as XLSX from "xlsx";
import axios from "axios"; // Import Axios

const AI = () => {
  const [exp, setExp] = useState([]);
  const [blockedCredits, setBlockedCredits] = useState([]);

  const blockedCreditTransactions = [
    "Exempt Supply",
    "Other",
    "Motor Vehicle",
    "Business Meet",
    "Construction",
    "Non-Taxable",
    "CSR",
    "Personal",
    "Transportation",
  ];

  const handleExpUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const exp = e.target.result;
      const workbook = XLSX.read(exp, { type: "binary" });
      const SheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[SheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setExp(parsedData);

      // Filter blocked credits
      const filteredBlockedCredits = parsedData.filter((row) =>
        blockedCreditTransactions.includes(row["Nature of Expenses"])
      );
      setBlockedCredits(filteredBlockedCredits);
    };
  };

  const handleAnalyze = async () => {
    // Calculate total CGST, SGST, IGST from blockedCredits
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    blockedCredits.forEach((credit) => {
      totalCGST += credit.CGST || 0; 
      totalSGST += credit.SGST || 0; 
      totalIGST += credit.IGST || 0; 
    });

    // Send data to backend to store in database using Axios
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/blocked`, {
        CGST: totalCGST,
        SGST: totalSGST,
        IGST: totalIGST,
      });

      if (response.status === 200) {
        alert("Blocked credits saved successfully");
      } else {
        alert("Failed to save blocked credits: " + response.data.error);
      }
    } catch (error) {
      alert("Error saving blocked credits: " + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Identification of Blocked Credits
      </h1>

      <div className="mb-8 shadow-lg p-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
          Upload Transactions
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex gap-2">
            <div className="flex-grow">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExpUpload}
                className="block w-full p-3 border border-gray-700 rounded-lg shadow-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleAnalyze}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Transactions
            </button>
          </div>
          <div>
            {exp.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
                <table className="w-full h-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      {Object.keys(exp[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {exp.map((row, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                        } hover:bg-gray-600`}
                      >
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-4 py-2">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blocked Credit Transactions Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Blocked Credit Transactions
        </h2>
        {blockedCredits.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(blockedCredits[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blockedCredits.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {Object.values(row).map((value, i) => (
                    <td
                      key={i}
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">No blocked credit transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default AI;
