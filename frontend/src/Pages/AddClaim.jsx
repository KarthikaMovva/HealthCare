import { useState } from "react";
import axios from "axios";

const AddClaim = () => {
 


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    claimAmount: 0,
    description: '',
    documentUrl: '',
    status: 'Pending',
    approvedAmount: 0,
    insurerComments: '',
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
      const response = await axios.post(
        'http://localhost:3000/claims/post',
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Claim added successfully:", response.data);
      alert("Claim added successfully!");
    } catch (error) {
        console.error("Error adding claim:", error.response?.data || error.message);
        alert(`Error: ${JSON.stringify(error.response?.data, null, 2)}`);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Claim</h2>
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
          <input type="text" name="documentUrl" value={formData.documentUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">Add Claim</button>
      </form>
    </div>
  );
};

export default AddClaim;
