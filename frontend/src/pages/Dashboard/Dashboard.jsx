import React from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import BuyerDashboard from "./BuyerDashboard";
import SellerDashboard from "./SellerDashboard";
import { HomePage } from "../HomePage";

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
      return <HomePage/>;
  }
};

export default Dashboard;
