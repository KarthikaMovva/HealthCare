import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UpdateClaim = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const claim = location.state || {};
  const next=useNavigate();

  const [formData, setFormData] = useState({
    name: claim.name,
    email: claim.email,
    claimAmount: claim.claimAmount,
    description: claim.description,
    documentUrl: claim.documentUrl,
    status: claim.status,
    approvedAmount: claim.approvedAmount,
    insurerComments: claim.insurerComments,
    patientId: claim.patientId, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: ["claimAmount", "approvedAmount"].includes(name) ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
    console.log("Submitting Form Data:", formData);
    console.log("Data Types:", {
      claimAmount: typeof formData.claimAmount,
      approvedAmount: typeof formData.approvedAmount,
    });
  
    try {
      const response = await axios.put(
        `http://localhost:3000/claims/${id}`,
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Claim updated successfully:", response.data);
      alert("Claim updated successfully!");
      next("/all");
    } catch (error) {
      console.error("Error updating claim:", error.response?.data || error.message);
      alert(`Error: ${JSON.stringify(error.response?.data, null, 2)}`);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Claim</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>

        <label className="block mb-2">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>

        <label className="block mb-2">
          Claim Amount:
          <input type="number" name="claimAmount" value={formData.claimAmount} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>

        <label className="block mb-2">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        </label>
<label className="block mb-2">
          Document URL:
          <img src={formData.documentUrl} alt={formData.documentUrl} />
        </label> 

        <label className="block mb-2">
          Status:
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label className="block mb-2">
          Approved Amount:
          <input type="number" name="approvedAmount" value={formData.approvedAmount} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>

        <label className="block mb-2">
          Insurer Comments:
          <textarea name="insurerComments" value={formData.insurerComments} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        </label>

        {/* <label className="block mb-2">
          Patient ID:
          <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label> */}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">Update Claim</button>
      </form>
    </div>
  );
};

export default UpdateClaim;
