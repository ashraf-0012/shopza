import { Link } from "react-router";
import { FiGift, FiTag } from "react-icons/fi";
import "./PromoSection.css";

function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-box">
        <div className="promo-icon">
          <FiGift />
        </div>

        <div className="promo-text">
          <h3>Big Deals. Bigger Savings.</h3>
          <p>Get up to 50% off on selected items.</p>
        </div>

        <Link to="/shop" className="promo-button promo-button-filled">
          Shop Deals
        </Link>
      </div>

      <div className="promo-box">
        <div className="promo-icon">
          <FiTag />
        </div>

        <div className="promo-text">
          <h3>New Arrivals</h3>
          <p>Check out the latest products just for you.</p>
        </div>

        <Link to="/shop" className="promo-button promo-button-outline">
          Explore New
        </Link>
      </div>
    </section>
  );
}

export default PromoSection;