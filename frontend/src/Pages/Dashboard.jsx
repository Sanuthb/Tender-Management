import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bidStatus, setBidStatus] = useState([]); // Store bid status data
  const token = localStorage.getItem("token");

  // Fetch User Info
  const fetchUserInfo = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  // Fetch Bid Status
  const fetchBidStatus = async () => {
    try {
      if (!token) {
        console.error("No token found, authentication required.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/tenders/assigned", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setBidStatus(response.data); // Update state with fetched bid status
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Access Denied: You are not authorized to view this.");
        } else {
          console.error("Server Error:", error.response.data);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchBidStatus();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">User Dashboard</h1>
        <div className="dashboard-cont">
          {/* User Info Section */}
          <div className="user-info">
            <h2>Welcome, {user ? user.name : "Loading..."}</h2>
            <p>
              <strong>Email:</strong> {user ? user.email : "Loading..."}
            </p>
          </div>

          {/* Bid Status Section */}
          <div className="bid-status-section">
            <h2 className="section-title">Bid Status</h2>
            {bidStatus.length > 0 ? (
              bidStatus.map((tender) => (
                <div key={tender.id} className="bid_item">
                  <p>
                    <strong>Tender Title:</strong> {tender.title || "N/A"}
                  </p>
                  <p>
                    <strong>Bid Status:</strong> {tender.status == "open" ? "accepted":"pending"}
                  </p>
                </div>
              ))
            ) : (
              <p>No bids found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
