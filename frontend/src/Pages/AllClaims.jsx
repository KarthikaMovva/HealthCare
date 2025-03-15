import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClaimsTable = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [claimAmountFilter, setClaimAmountFilter] = useState("");
  const [submissionDateFilter, setSubmissionDateFilter] = useState("");
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
    let filtered = claims;

    if (selectedStatus !== "All") {
      filtered = filtered.filter((claim) => claim.status === selectedStatus);
    }

    if (claimAmountFilter) {
      filtered = filtered.filter((claim) => claim.claimAmount >= claimAmountFilter);
    }

    if (submissionDateFilter) {
        filtered = filtered.filter((claim) => {
            const submissionDate = new Date(claim.createdAt).toISOString().split("T")[0]; 
            return submissionDate === submissionDateFilter;
          });
    }

    setFilteredClaims(filtered);
  }, [selectedStatus, claimAmountFilter, submissionDateFilter, claims]);

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
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Claims List</h2>

        <div className="flex flex-wrap gap-4 justify-end mb-4">
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

          <input
            type="number"
            placeholder="Min Claim Amount"
            value={claimAmountFilter}
            onChange={(e) => setClaimAmountFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={submissionDateFilter}
            onChange={(e) => setSubmissionDateFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Claim Amount</th>
                <th className="p-3">Submission Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Document</th>
                <th className="p-3">Status</th>
                <th className="p-3">Approved Amount</th>
                <th className="p-3">Insurer Comments</th>
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
                    <td className="p-3 text-center">
  {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : "N/A"}
</td>
                    <td className="p-3 text-center">{claim.description}</td>
                    <td className="p-3 text-center">
                      <img src={claim.documentUrl} alt="Document" className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className={`p-3 text-center border rounded-lg ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </td>
                    <td className="p-3 text-center">{claim.approvedAmount}</td>
                    <td className="p-3 text-center">{claim.insurerComments}</td>
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
                  <td colSpan="10" className="text-center text-red-500 p-4 font-semibold">
                    No details are present for the selected filters.
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
