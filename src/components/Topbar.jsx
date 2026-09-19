import { FiTruck, FiHelpCircle, FiMapPin } from "react-icons/fi";
import "./TopBar.css";

function Topbar() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <FiTruck />
        <span>Free shipping on orders over $100</span>
      </div>

      <div className="top-bar-right">
        <span>
          <FiHelpCircle />
          Help & Support
        </span>

        <span>
          <FiMapPin />
          Track Order
        </span>

        <span>USD</span>
      </div>
    </div>
  );
}

export default Topbar;