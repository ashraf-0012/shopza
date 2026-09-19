import { Link } from "react-router";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>
            SHOP<span>ZA</span>
          </h2>
          <p>© 2026 Shopza. All rights reserved.</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>Customer Service</h4>
          <Link to="/contact">Help &amp; Support</Link>
          <Link to="/contact">Track Order</Link>
          <Link to="/contact">Returns &amp; Refunds</Link>
          <Link to="/contact">FAQs</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/about">Careers</Link>
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Terms &amp; Conditions</Link>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="#" aria-label="YouTube">
              <FiYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;