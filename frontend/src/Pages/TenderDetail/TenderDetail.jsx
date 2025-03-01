import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import "./TenderDetail.css";

const API_BASE_URL = "http://localhost:5000/api/tenders";

const TenderDetail = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth); // Get auth token from Redux state
  const [tender, setTender] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Tender Details
  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setTender(response.data);
      } catch (error) {
        console.error("Error fetching tender details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderData();
  }, [id]);

  // Submit a Bid
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!bidAmount) return alert("Please enter a bid amount");

    try {
      await axios.post(
        `${API_BASE_URL}/${id}/bid`,
        { message, amount: bidAmount },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`, 
            "Content-Type": "application/json",
          },
        }
      );

      setBidAmount("");
      setMessage("");
      alert("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error);
      alert(error.response?.data?.error || "Failed to place bid");
    }
  };

  if (loading) return <p>Loading tender details...</p>;

  return (
    <>
      <Navbar />
      <div className="tender-detail-container">
        <div className="tender-details">
        <h1>{tender.title}</h1>
        <p>{tender.description}</p>
        <p className={`status ${tender.status === "open" ? "open" : "closed"}`}>
          Status: {tender.status}
        </p>
        </div>

        {tender.status === "open" && (
          <form onSubmit={handleBidSubmit} className="bid-form">
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
              required
            />
            <button type="submit">Submit Bid</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TenderDetail;
