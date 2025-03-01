import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Tenders from "./Pages/Tenders/Tenders";
import TenderDetail from "./Pages/TenderDetail/TenderDetail";
import BuyerDashboard from "./Pages/BuyerDashboard/BuyerDashboard";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

const App = () => {
  // const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tender" element={<Tenders />} />
      <Route path="/tenders/:id" element={<TenderDetail />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
