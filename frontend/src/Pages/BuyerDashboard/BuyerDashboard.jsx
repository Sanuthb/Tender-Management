import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./BuyerDashboard.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import BidsComponent from "../../Component/BidsComponent/BidsComponent";

const BuyerDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [tenders, setTenders] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [formStatus, setFormStatus] = useState(""); // Tracks form status

  useEffect(() => {
    if (token) fetchTenders();
  }, [token]); // Fetch tenders when token changes

  // Fetch tenders posted by the logged-in buyer
  const fetchTenders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:5000/api/tenders/specifictender",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTenders(response.data);
    } catch (error) {
      console.error("Error fetching tenders:", error.response?.data?.error || error.message);
    }
  };

  // Handle tender submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      await axios.post("http://localhost:5000/api/tenders", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFormData({ title: "", description: "" }); // Reset form
      fetchTenders(); // Refresh tenders after posting
      setFormStatus("success");
    } catch (error) {
      console.error("Error posting tender:", error.response?.data || error);
      setFormStatus("error");
    }
  };

  // Close a tender
  const closeTender = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tenders/close/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTenders(); // Refresh tenders after closing one
    } catch (error) {
      console.error("Error closing tender:", error.response?.data || error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="buyer-dashboard">
        <h1 className="dashboard-title">Buyer Dashboard</h1>

        {/* Tender Posting Form */}
        <form className="tender-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Post a New Tender</h2>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-input"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-textarea"
            required
          />
          <button type="submit" className="submit-button">
            {formStatus === "loading" ? "Posting..." : "Post Tender"}
          </button>

          {/* Form Status Messages */}
          {formStatus === "success" && <p className="success-message">Tender posted successfully!</p>}
          {formStatus === "error" && <p className="error-message">Failed to post the tender. Try again.</p>}
        </form>

        {/* Existing Tenders */}
        <div className="tender-list">
          <h2 className="section-title">My Tenders</h2>
          <div className="mytenders">
            {tenders.length === 0 ? (
              <p>No tenders posted yet.</p>
            ) : (
              <ul>
                {tenders.map((tender) => (
                  <li key={tender.id} className="tender-item">
                    <h3>{tender.title}</h3>
                    <p>{tender.description}</p>
                    <span>Status: {tender.status}</span>

                    {/* Close Tender Button */}
                    {tender.status === "open" ? (
                      <button
                        className="close-button"
                        onClick={() => closeTender(tender.id)}
                      >
                        Close Tender
                      </button>
                    ) : (
                      <span className="closed-label">Closed</span>
                    )}

                    {/* Pass tenderId to BidsComponent */}
                    <BidsComponent tenderId={tender.id} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BuyerDashboard;
