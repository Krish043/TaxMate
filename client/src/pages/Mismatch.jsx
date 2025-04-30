import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const Mismatch = () => {
  const [gst, setGst] = useState([]);
  const [acc, setAcc] = useState([]);
  const [mismatchedFromGst, setMismatchedFromGst] = useState([]);
  const [mismatchedFromAcc, setMismatchedFromAcc] = useState([]);
  const [combinedMismatches, setCombinedMismatches] = useState([]);

  const handleGSTUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const gst = e.target.result;
      const workbook = XLSX.read(gst, { type: "binary" });
      const SheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[SheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setGst(parsedData);
    };
  };

  const handleAccUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const acc = e.target.result;
      const workbook = XLSX.read(acc, { type: "binary" });
      const SheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[SheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setAcc(parsedData);
    };
  };

  const compareGstWithAcc = () => {
    const mismatches = [];
    gst.forEach((gstRow) => {
      const gstSupplier = gstRow["Trade/Legal Name"];
      let foundMatch = false;

      acc.forEach((accRow) => {
        const accSupplier = accRow["Supplier"];
        if (gstSupplier === accSupplier) {
          foundMatch = true;
        }
      });

      if (!foundMatch) {
        mismatches.push(gstSupplier);
      }
    });
    setMismatchedFromGst(mismatches);
  };

  const compareAccWithGst = () => {
    const mismatches = [];
    acc.forEach((accRow) => {
      const accSupplier = accRow["Supplier"];
      let foundMatch = false;

      gst.forEach((gstRow) => {
        const gstSupplier = gstRow["Trade/Legal Name"];
        if (accSupplier === gstSupplier) {
          foundMatch = true;
        }
      });

      if (!foundMatch) {
        mismatches.push(accSupplier);
      }
    });
    setMismatchedFromAcc(mismatches);
  };

  const compareCombinedColumns = () => {
    const mismatches = [];

    acc.forEach((accRow) => {
      const accCombined = `${accRow["Supplier"] || ""} | ${
        accRow["Supplier Invoice No."] || ""
      }`;
      let foundMatch = false;

      gst.forEach((gstRow) => {
        const gstCombined = `${gstRow["Trade/Legal Name"] || ""} | ${
          gstRow["Invoice No."] || ""
        }`;
        if (accCombined === gstCombined) {
          foundMatch = true;
        }
      });

      if (!foundMatch) {
        mismatches.push({
          supplier: accRow["Supplier"],
          invoiceNo: accRow["Supplier Invoice No."],
        });
      }
    });

    setCombinedMismatches(mismatches);
  };

  const handleComparison = async () => {
    compareGstWithAcc();
    compareAccWithGst();
    compareCombinedColumns();
  
    try {
      const response = await axios.post(`${import.meta.env.BACKEND}/wallet`, {
        mismatchedFromAcc,
        accData: acc,
      });

      console.log(response);
  
      if (response.data.success) {
        alert("Mismatched supplier details saved successfully!");
      } else {
        console.error("Failed to save mismatched details:", response.data.error);
      }
    } catch (error) {
      console.error("Error while saving mismatched suppliers:", error);
    }
  };
  

  return (
    <>
      <div className="container mx-auto px-4 py-8 h-[calc(100vh-55px)]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Reconcilation of GSTR
        </h1>

        <div className="mb-8  shadow-lg p-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
            Upload Files
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="gst-portal"
                className="block text-sm font-medium text-indigo-200 mb-2"
              >
                GST Portal Data
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleGSTUpload}
                className="block w-full p-3 border border-gray-700 rounded-lg shadow-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {gst.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
                  <table className="w-full h-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        {Object.keys(gst[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {gst.map((row, index) => (
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

            <div>
              <label
                htmlFor="accounting-software"
                className="block text-sm font-medium text-indigo-200 mb-2"
              >
                Accounting Software Data
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleAccUpload}
                className="block w-full p-3 border border-gray-700 rounded-lg shadow-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {acc.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
                  <table className="w-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        {Object.keys(acc[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {acc.map((row, index) => (
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

          <div className="w-full flex items-center justify-center">
            <button
              className="mt-7 mb-7 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all duration-300"
              onClick={handleComparison}
            >
              Compare and Save
            </button>
          </div>
          <div className="flex justify-center items-start gap-8 p-8 bg-gray-900 text-white">
            {gst.length > 0 && acc.length > 0 && (
              <>
                <div className="bg-gray-800 w-1/3 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-indigo-400">
                    Entries in GST but not in ACC
                  </h3>
                  {mismatchedFromGst.length > 0 ? (
                    <ul className="space-y-2">
                      {mismatchedFromGst.map((supplier, index) => (
                        <li
                          key={index}
                          className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600"
                        >
                          {supplier}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No mismatches found.</p>
                  )}
                </div>

                <div className="bg-gray-800 w-1/3 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-indigo-400">
                    Entries in ACC but not in GST
                  </h3>
                  {mismatchedFromAcc.length > 0 ? (
                    <ul className="space-y-2">
                      {mismatchedFromAcc.map((supplier, index) => (
                        <li
                          key={index}
                          className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600"
                        >
                          {supplier}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No mismatches found.</p>
                  )}
                </div>

                <div className="bg-gray-800 w-1/3 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-indigo-400">
                    Mismatches in Combined Columns
                  </h3>
                  {combinedMismatches.length > 0 ? (
                    <ul className="space-y-2">
                      {(() => {
                        const filteredMismatches = [];

                        for (const mismatch of combinedMismatches) {
                          let foundInGst = false;
                          let foundInAcc = false;

                          for (const gstEntry of mismatchedFromGst) {
                            if (gstEntry === mismatch.supplier) {
                              foundInGst = true;
                              break;
                            }
                          }

                          for (const accEntry of mismatchedFromAcc) {
                            if (accEntry === mismatch.supplier) {
                              foundInAcc = true;
                              break;
                            }
                          }

                          if (!foundInGst && !foundInAcc) {
                            filteredMismatches.push(mismatch);
                          }
                        }

                        return filteredMismatches.length > 0 ? (
                          filteredMismatches.map((mismatch, index) => (
                            <li
                              key={index}
                              className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600"
                            >
                              Supplier:{" "}
                              <span className="font-medium text-indigo-300">
                                {mismatch.supplier}
                              </span>
                              , Invoice No.:{" "}
                              <span className="font-medium text-indigo-300">
                                {mismatch.invoiceNo}
                              </span>
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-400">No mismatches found.</p>
                        );
                      })()}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No mismatches found.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Mismatch;
