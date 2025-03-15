import React from 'react';
import { FaShieldAlt, FaHeartbeat, FaRegHospital } from "react-icons/fa";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="flex flex-col md:flex-row items-center justify-center text-center md:text-left 
                         px-10 py-20 bg-white shadow-lg rounded-lg mx-6 md:mx-20 mt-10">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-700 leading-tight">
            Your Health, Our Priority
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Get the best medical insurance plans tailored to your needs. 
            Secure your health, secure your future.
          </p>
          <a className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-green-500 
                                     text-white font-semibold text-lg px-8 py-3 rounded-lg 
                                     hover:shadow-lg transition duration-300">
            Explore Plans
          </a>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img src="https://assets.thehansindia.com/hansindia-bucket/4802_Insurance.jpg" 
               alt="Medical Insurance" className="rounded-lg shadow-md" />
        </div>
      </header>
      <section className="py-20 px-10 text-center">
        <h2 className="text-3xl font-bold text-blue-700">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mt-4 mx-auto max-w-3xl">
          We provide customized insurance plans that cater to every individual’s medical needs.
          With 24/7 customer support and seamless claim processing, your health is in safe hands.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <FaShieldAlt className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Secure & Reliable</h3>
            <p className="text-gray-600 mt-2">We ensure a hassle-free and trustworthy insurance experience.</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg">
            <FaHeartbeat className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Affordable Plans</h3>
            <p className="text-gray-600 mt-2">Choose from a variety of cost-effective plans suited for you.</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg">
            <FaRegHospital className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Hospital Coverage</h3>
            <p className="text-gray-600 mt-2">Access a vast network of hospitals nationwide.</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-lg">&copy; 2025 MediShield. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default Homepage
