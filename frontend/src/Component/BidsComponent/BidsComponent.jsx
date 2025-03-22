import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./BidsComponent.css";

const BidsComponent = ({ tenderId }) => {
  const { token } = useSelector((state) => state.auth);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchBids();
  }, []);

  // Fetch bids for the given tender
  const fetchBids = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/bids/${tenderId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      });
      setBids(response.data);
    } catch (error) {
      console.error("Error fetching bids:", error.response?.data?.error || error);
    }
  };

  // Handle accept/reject bid
  const updateBidStatus = async (bidId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bids/${bidId}`,
        { status }, // Update bid status
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        }
      );
      fetchBids(); // Refresh bids after update
    } catch (error) {
      console.error("Error updating bid:", error.response?.data?.error || error);
    }
  };

  return (
    <div className="bids-container">
      <h3>Bids for Tender</h3>
      {bids.length === 0 ? (
        <p>No bids available</p>
      ) : (
        <ul className="bids-list">
          {bids.map((bid) => (
            <li key={bid.id} className="bid-item">
              <p><strong>Supplier:</strong> {bid.supplier?.name}</p>
              <p><strong>Amount:</strong> ${bid.amount}</p>
              <p><strong>Status:</strong> {bid.status}</p>
              {bid.status === "pending" && (
                <div className="bid-actions">
                  <button onClick={() => updateBidStatus(bid.id, "accepted")} className="accept-btn">Accept</button>
                  <button onClick={() => updateBidStatus(bid.id, "rejected")} className="reject-btn">Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BidsComponent;
