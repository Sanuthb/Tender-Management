import React from "react";
import "./Navbar.css";
import { LuMessageSquareMore } from "react-icons/lu";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get token from Redux store
  const authtoken = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <div className="topbar">
        <div className="contactdetails">
          <div className="contact">
            <LuMessageSquareMore />
            <p>info@onlinebid.com</p>
          </div>
          <div className="contact">
            <BsFillTelephoneFill />
            <p>+91123456789</p>
          </div>
        </div>
        <div className="right_containter">
          <div className="social-icons">
            <div className="socialicon">
              <FaFacebookF />
            </div>
            <div className="socialicon">
              <FaInstagram />
            </div>
            <div className="socialicon">
              <FaXTwitter />
            </div>
            <div className="socialicon">
              <FaWhatsapp />
            </div>
          </div>
          {authtoken ? (
            <button className="logout registerbtn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="login" onClick={() => navigate("/login")}>
                Login
              </button>
              <button
                className="registerbtn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
      <div className="bottombar">
        <div className="logo">onlinebid</div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          {user && user.role === "supplier" && (
            <>
              <Link to="/tender">Tenders</Link>
            </>
          )}
          {authtoken && <Link to="/dashboard">Dashboard</Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
