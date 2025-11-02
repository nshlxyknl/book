import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import BuyerDashboard from "./BuyerDashboard";
import SellerDashboard from "./SellerDashboard";
import { HomePage } from "../HomePage";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("payment");

    if (status === "success") {
      alert("Payment successful");

        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (cartItems.length > 0) {
      fetch("http://localhost:4000/salestype/pending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: cartItems }),
      })
        .then(res => res.json())
        .then(data => console.log("Sales saved:", data))
        .catch(err => console.error("Error saving sales:", err));

      // Clear cart after sending
      localStorage.removeItem("cartItems");
    }
    
      navigate(`/dashboard`, { replace: true })
    } else if (status === "cancel") {
      alert("Payment canceled");
      navigate(`/dashboard`, { replace: true })
    }

  }, [location, navigate]);

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
      return <HomePage />;
  }
};

export default Dashboard;
