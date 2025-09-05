import React from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./page/AdminDashboard";
import BuyerDashboard from "./page/BuyerDashboard";
import SellerDashboard from "./page/SellerDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  if (!role) 
    return <Navigate to="/login" />;

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "buyer":
      return <BuyerDashboard />;
    case "seller":
      return <SellerDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
};

export default Dashboard;
