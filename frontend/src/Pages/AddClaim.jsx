import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dg6izvre4/upload";
const UPLOAD_PRESET = "unsigned_upload";

const AddClaim = () => {
  const { patientId } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    claimAmount: 0,
    description: "",
    documentUrl: "",
    status: "Pending",
    approvedAmount: 0,
    insurerComments: "",
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFile(e.target.files[0]); 
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: ["claimAmount", "approvedAmount"].includes(name) ? Number(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
    if (!/^[a-fA-F0-9]{24}$/.test(patientId)) {
      alert("Invalid Patient ID");
      return;
    }

    try {
      let uploadedUrl = "";
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", UPLOAD_PRESET);

        const cloudinaryResponse = await axios.post(CLOUDINARY_URL, uploadData);
        uploadedUrl = cloudinaryResponse.data.secure_url;
      }

      const finalData = {
        ...formData,
        documentUrl: uploadedUrl,
        patientId, 
      };

      const response = await axios.post(
        "http://localhost:3000/claims/post",
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Claim added successfully:", response.data);
      alert("Claim added successfully!");
      navigate(`/all/${patientId}`);
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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Claim Amount:
          <input
            type="number"
            name="claimAmount"
            value={formData.claimAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </label>

        <label className="block mb-2">
          Document Upload:
          <input
            type="file"
            name="documentUrl"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">
          Add Claim
        </button>
      </form>
    </div>
  );
};

export default AddClaim;
