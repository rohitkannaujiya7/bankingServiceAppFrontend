import Login from "./Components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Pages/Dashboard";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
