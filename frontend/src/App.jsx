import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import AddClaim from "./Pages/AddClaim";
import UpdateClaim from "./Pages/UpdateClaim";
import AllClaims from "./Pages/AllClaims";
import Navbar from "./Pages/Navbar";
import SpecificAll from "./Pages/SpecificAll";


function App() {

  return (
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/"  element={<Homepage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/add" element={<AddClaim/>}></Route>
      <Route path="/update/:id" element={<UpdateClaim/>}></Route>
      <Route path="/all" element={<AllClaims/>}></Route>
      <Route path="/all/:patientId" element={<SpecificAll/>}></Route>
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
   </Router>
  )
}

export default App
