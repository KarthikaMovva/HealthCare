import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClaimsTable = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/claims", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClaims(response.data);
        setFilteredClaims(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching claims:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredClaims(claims);
    } else {
      const filtered = claims.filter((claim) => claim.status === selectedStatus);
      setFilteredClaims(filtered);
    }
  }, [selectedStatus, claims]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100 border-green-500";
      case "Rejected":
        return "text-red-600 bg-red-100 border-red-500";
      default:
        return "text-yellow-600 bg-yellow-100 border-yellow-500";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Claims List</h2>

        <div className="flex justify-end mb-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Claim Amount</th>
                <th className="p-3">Description</th>
                <th className="p-3">Document</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.length > 0 ? (
                filteredClaims.map((claim) => (
                  <tr key={claim._id} className="border-b hover:bg-gray-100 transition">
                    <td className="p-3 text-center">{claim.name}</td>
                    <td className="p-3 text-center">{claim.email}</td>
                    <td className="p-3 text-center">${claim.claimAmount}</td>
                    <td className="p-3 text-center">{claim.description}</td>
                    <td className="p-3 text-center">{claim.documentUrl}</td>
                    <td className={`p-3 text-center border rounded-lg ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => Navigate(`/update/${claim._id}`, { state: { ...claim, patientId: claim.patientId } })}
                        className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg 
                                   hover:shadow-md transition-all duration-300"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-red-500 p-4 font-semibold">
                    No claims found with the status "{selectedStatus}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClaimsTable;
