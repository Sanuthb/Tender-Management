import React from "react";
import "./Footer.css"; 
import { LuMessageSquareMore } from "react-icons/lu";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Lawyer Consulting</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Term & Condition</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help Center</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Borrow</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Product Details</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><BsFillTelephoneFill/> +1 559 154 2587</p>
          <p><LuMessageSquareMore/> info@tender.com</p>
        </div>

        <div className="footer-section follow-us">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><span className="icon facebook"><FaFacebookF/></span> Facebook</a></li>
            <li><a href="#"><span className="icon twitter"><FaXTwitter/></span> Twitter</a></li>
            <li><a href="#"><span className="icon twitter"><FaInstagram/></span> Instagram</a></li>
            <li><a href="#"><span className="icon twitter"><FaWhatsapp/></span> Whatsapp</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
