import React, { useEffect, useState } from "react";
import { getTenders } from "../../services/api"; // Import API function
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "./Tenders.css"; // Import CSS
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

const Tenders = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const data = await getTenders();
        setTenders(data);
      } catch (error) {
        console.error("Failed to fetch tenders", error);
      }
    };
    fetchTenders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="tenders-container">
        <div className="tender_heading">
          <div className="leftcontainer">
            <h1>All Tenders</h1>
            <div className="link">
              <Link to="/">Home</Link> <MdKeyboardDoubleArrowRight /> Tenders
            </div>
          </div>
          <div className="rightcontainer">
            <img src="/tender.png" alt="Tender" />
          </div>
        </div>

        <div className="tender_section">
          <h1>Latest Tenders</h1>
          <div className="tenders-list">
            {tenders.length > 0 ? (
              tenders.map((tender) => (
                <div key={tender.id} className="tender-card">
                  <h3>{tender.title}</h3>
                  <p>{tender.description}</p>
                  <p
                    className={`status ${
                      tender.status === "open" ? "open" : "closed"
                    }`}
                  >
                    Status: {tender.status}
                  </p>
                  <Link
                    to={`/tenders/${tender.id}`}
                    className="view-details-btn"
                  >
                    Submit Bid
                  </Link>
                </div>
              ))
            ) : (
              <p>No tenders available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tenders;
