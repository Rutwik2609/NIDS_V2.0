import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AttackRecords = () => {
  const [attackData, setAttackData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    axios.get("http://localhost:5000/api/v1/result/view-result") // Change URL based on your backend
      .then((response) => {
        setAttackData(response.data); // Store data in state
      })
      .catch((error) => {
        console.error("Error fetching attack data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4 md:mb-6 text-center">Attack Records</h1>

      <div className="w-full max-w-6xl overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">Prediction</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">Count</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">Flag</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">Service HTTP</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">Logged In</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {attackData.map((attack, index) => (
                  <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm md:text-base">{attack.prediction}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm md:text-base">{attack.count}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm md:text-base">{attack.flag}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm md:text-base">{attack.service_http ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm md:text-base">{attack.logged_in ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm md:text-base">{new Date(attack.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg w-32 text-center transition-transform hover:scale-105 shadow-lg"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default AttackRecords;
