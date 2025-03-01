import React, { useEffect, useState } from "react";
import { getTenders } from "../../services/api";
import "./Auction.css";
import { useNavigate,Link} from "react-router-dom";

const Auction = () => {
  const [tenders, setTenders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

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
    <div className="auction">
      <h1>Latest Tender</h1>
      <div className="tenders-list">
        {tenders.slice(0, showAll ? tenders.length : 6).map((tender) => (
          <div key={tender.id} className="tender-card">
            <h3>{tender.title}</h3>
            <p>{tender.description}</p>
            <p
              className={`status ${
                tender.status === "open" ? "open" : "closed"
              }`}
            >
              Status:{" "}
              {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
            </p>
            <Link to={`/tenders/${tender.id}`} className="view-details-btn">
              Submit Bid
            </Link>
          </div>
        ))}
      </div>
      {tenders.length > 5 && (
        <button onClick={() => navigate("/")} className="view-more">
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </div>
  );
};

export default Auction;
