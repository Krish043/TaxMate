import React from 'react'

const ITC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Inter-Departmental Transfer ITC Adjustment</h1>
    
          {/* New Transfer Section */}
          <div className="mb-8 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">New Transfer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Department */}
              <div>
                <label htmlFor="from-dept" className="block text-sm font-medium text-gray-700">
                  From Department
                </label>
                <select
                  id="from-dept"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option>Select department</option>
                  <option value="sales">Nishtha</option>
                  <option value="marketing">Darshil</option>
                  <option value="operations">Archit</option>
                </select>
              </div>
    
              {/* To Department */}
              <div>
                <label htmlFor="to-dept" className="block text-sm font-medium text-gray-700">
                  To Department
                </label>
                <select
                  id="to-dept"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option>Select department</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
    
              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
    
              {/* Process Transfer Button */}
              <div className="flex items-end">
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  Process Transfer
                </button>
              </div>
            </div>
          </div>
    
          {/* Recent Transfers Section */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Transfers</h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Transfer ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    From Department
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    To Department
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">TRF001</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Sales</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Marketing</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">₹5,000</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-green-500">Completed</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">TRF002</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Operations</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Sales</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">₹3,000</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-yellow-500">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default ITC
