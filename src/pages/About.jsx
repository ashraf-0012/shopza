import { Link } from "react-router";
import {
  FiTruck,
  FiShield,
  FiStar,
  FiHeadphones,
} from "react-icons/fi";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-text">
          <span className="about-label">About Us</span>
          <h1>More than just a store, we're a community.</h1>
          <p>
            At Shopza, we believe shopping should be simple, enjoyable and
            accessible to everyone. We're here to bring you the latest
            trends, great prices and a seamless online shopping experience.
          </p>
        </div>

        <div className="about-hero-image">
          <img src="/images/about/about-hero.png" alt="Woman shopping online with Shopza" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stat-item">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h2>500+</h2>
          <p>Products</p>
        </div>
        <div className="stat-item">
          <h2>24/7</h2>
          <p>Support</p>
        </div>
        <div className="stat-item">
          <h2>4.8/5</h2>
          <p>Customer Rating</p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values">
        <div className="values-heading">
          <h2>Our Values</h2>
          <p>
            These values guide everything we do, from the products we choose
            to the experience we create for you.
          </p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon icon-blue">
              <FiTruck />
            </div>
            <h3>Fast &amp; Reliable</h3>
            <p>We make sure your orders arrive on time, every time.</p>
          </div>

          <div className="value-card">
            <div className="value-icon icon-purple">
              <FiShield />
            </div>
            <h3>Secure Shopping</h3>
            <p>Your data and payments are always protected.</p>
          </div>

          <div className="value-card">
            <div className="value-icon icon-green">
              <FiStar />
            </div>
            <h3>Great Quality</h3>
            <p>We only offer products we truly believe in.</p>
          </div>

          <div className="value-card">
            <div className="value-icon icon-pink">
              <FiHeadphones />
            </div>
            <h3>Dedicated Support</h3>
            <p>Our team is always here to help you.</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story">
        <div className="story-image">
          <img src="/images/about/about-story.png" alt="Shopza branded packaging box" />
        </div>

        <div className="story-text">
          <span className="about-label">Our Story</span>
          <h2>Built with you in mind</h2>
          <p>
            Shopza started with a simple idea — to make online shopping
            easier, better and more enjoyable. What began as a small project
            has grown into a platform trusted by thousands of customers.
          </p>
          <p className="story-highlight">
            Better products. Happier customers. That's Shopza.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="about-cta">
        <h2>Better products. Happier customers. That's Shopza.</h2>
        <Link to="/shop" className="cta-button">
          Shop Now
        </Link>
      </section>
    </div>
  );
}

export default About;
