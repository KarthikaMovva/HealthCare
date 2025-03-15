import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

const PatientClaimsTable = () => {
  const { patientId } = useParams(); 
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      if (!patientId) {
        setError("Invalid Patient ID");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/claims/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClaims(response.data);
      } catch (err) {
        setError("Failed to fetch claims. Please try again.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [patientId]);

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Your Claims</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-blue-500 mb-5">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-blue-500 px-4 py-2">Claim ID</th>
              <th className="border border-blue-500 px-4 py-2">Amount</th>
              <th className="border border-blue-500 px-4 py-2">Status</th>
              <th className="border border-blue-500 px-4 py-2">Approved Amount</th>
              <th className="border border-blue-500 px-4 py-2">Description</th>
              <th className="border border-blue-500 px-4 py-2">Insurer Comments</th>
            </tr>
          </thead>
          <tbody>
            {claims.length > 0 ? (
              claims.map((claim) => (
                <tr key={claim._id} className="hover:bg-green-200">
                  <td className="border border-blue-500 px-4 py-2">{claim._id}</td>
                  <td className="border border-blue-500 px-4 py-2">${claim.claimAmount}</td>
                  <td
                    className={`border border-blue-500 px-4 py-2 ${
                      claim.status === "Approved"
                        ? "text-green-700"
                        : claim.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {claim.status}
                  </td>
                  <td className="border border-blue-500 px-4 py-2">${claim.approvedAmount || "N/A"}</td>
                  <td className="border border-blue-500 px-4 py-2">{claim.description}</td>
                  <td className="border border-blue-500 px-4 py-2">{claim.insurerComments || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
       <Link to={`/add/${patientId}`}><button>Add Claim</button></Link> 
      </div>
    </div>
  );
};

export default PatientClaimsTable;
