import { Link } from "react-router";
import { FiHome } from "react-icons/fi";

import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-image">
          <img
            src="/images/404/404-image.png"
            alt="Shopza shopping bag"
          />
        </div>

        <div className="not-found-content">
          <p className="not-found-number">404</p>

          <h1>Oops! This page doesn't exist.</h1>

          <p className="not-found-description">
            The page you're looking for may have been moved
            or doesn't exist anymore.
          </p>

          <Link to="/" className="not-found-button">
            <FiHome />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;