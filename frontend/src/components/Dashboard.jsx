// Dashboard.jsx
import React from "react";

const Dashboard = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} />;
    case "seller":
      return <SellerDashboard user={user} />;
    case "buyer":
      return <BuyerDashboard user={user} />;
    default:
      return <p>Unknown role</p>;
  }
};

const AdminDashboard = ({ user }) => (
  <div>
    <h2>Welcome Admin {user.username}</h2>
    <ul>
      <li>Manage Users</li>
      <li>View All Books</li>
      <li>Delete Inappropriate Content</li>
    </ul>
  </div>
);

const SellerDashboard = ({ user }) => (
  <div>
    <h2>Welcome Seller {user.username}</h2>
    <ul>
      <li>Upload New Book</li>
      <li>View Your Books</li>
      <li>Track Sales</li>
    </ul>
  </div>
);

const BuyerDashboard = ({ user }) => (
  <div>
    <h2>Welcome Buyer {user.username}</h2>
    <ul>
      <li>Browse Books</li>
      <li>Your Purchased Books</li>
      <li>Download PDFs</li>
    </ul>
  </div>
);

export default Dashboard;
