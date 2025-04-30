import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: "Jan", tax: 5000 },
  { month: "Feb", tax: 6000 },
  { month: "Mar", tax: 7500 },
  { month: "Apr", tax: 8000 },
  { month: "May", tax: 7000 },
  { month: "Jun", tax: 9000 },
];

const categoryData = [
  { name: "CGST", value: 4000 },
  { name: "SGST", value: 3000 },
  { name: "IGST", value: 2000 },
];

const complianceData = [
  { month: "Jan", compliance: 95 },
  { month: "Feb", compliance: 98 },
  { month: "Mar", compliance: 92 },
  { month: "Apr", compliance: 97 },
  { month: "May", compliance: 99 },
  { month: "Jun", compliance: 100 },
];

const Tax = () => {
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Visual Tax Management</h1>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Tax Liability */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Monthly Tax Liability</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tax" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
    
            {/* Tax Category Breakdown */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Tax Category Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#4ade80" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
    
            {/* Compliance Score Trend */}
            <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-2">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Compliance Score Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={complianceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="compliance" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
    
          {/* Tax Period Selection */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Tax Period Selection</h2>
            <select className="w-[200px] p-2 border border-gray-300 rounded-md">
              <option value="q1">Q1 2023</option>
              <option value="q2">Q2 2023</option>
              <option value="q3">Q3 2023</option>
              <option value="q4">Q4 2023</option>
            </select>
          </div>
        </div>
      );
}

export default Tax
