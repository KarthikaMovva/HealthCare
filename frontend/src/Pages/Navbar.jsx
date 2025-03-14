import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { HeartPulse, Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token")
    alert("Logout Successfull")
    Navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-green-600 font-bold text-2xl">
          <HeartPulse className="w-7 h-7 mr-2 text-green-500" /> MediShield
        </Link>
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><Link to="/login" className="hover:text-green-600">Login</Link></li>
          <li onClick={handleLogout}><Link className="hover:text-green-600" >Logout</Link></li>
        </ul>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
          <li><Link to="/login" className="hover:text-green-600" onClick={() => setIsOpen(false)}>Login</Link></li>
          <li onClick={handleLogout}><Link className="hover:text-green-600" onClick={() => setIsOpen(false)}>Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
