import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [patientId, setPatientId] = useState(null);
  const navigate = useNavigate();

  const getUserId = async (userEmail) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/get-user-id",
        { email: userEmail }
      );
      setPatientId(response.data._id);
    } catch (error) {
      console.error(
        "Error fetching user ID:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        name : formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });


      localStorage.setItem("token", response.data.access_token);

      await getUserId(formData.email);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (patientId) {
      if (formData.role === "insurer") {
        navigate("/all");
      } else {
        navigate(`/all/${patientId}`);
        alert("Signup successful!");
      }
    }
  }, [patientId, formData.role, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-lg border border-transparent hover:border-blue-400 transition duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            >
              <option value="patient">Patient</option>
              <option value="insurer">Insurer</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-md transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
