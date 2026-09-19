import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiMessageCircle,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiRefreshCw,
  FiSend,
} from "react-icons/fi";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-text">
          <span className="contact-label">Contact Us</span>
          <h1>We'd love to hear from you.</h1>
          <p>
            Have a question, suggestion or need help? Our team is here to
            assist you. Reach out to us and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="contact-hero-image">
          <img src="/images/contact/contact-hero.png" alt="Customer support representative" />
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="contact-main">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>
            You can reach us through any of the channels below. We're always
            happy to help.
          </p>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <FiMail />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>support@shopza.com</p>
                <span>We'll respond within 24 hours.</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FiPhone />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>+234 800 123 4567</p>
                <span>Mon - Fri, 9am - 6pm (WAT)</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FiMapPin />
              </div>
              <div>
                <h3>Our Address</h3>
                <p>123 Commerce Street, Kaduna, Nigeria</p>
                <span>Visit us anytime.</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FiMessageCircle />
              </div>
              <div>
                <h3>Live Chat</h3>
                <p>Available on our website</p>
                <span>Mon - Fri, 9am - 6pm (WAT)</span>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="map-placeholder">
            <div className="map-pin">
              <FiMapPin />
            </div>
            <p>Shopza — 123 Commerce Street, Kaduna, Nigeria</p>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Send us a message</h2>
          <p>Fill out the form below and we'll get back to you shortly.</p>

          {submitted && (
            <div className="form-success">
              Thanks! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="support">Product Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              <FiSend /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="benefits-strip">
        <div className="benefit-item">
          <FiTruck />
          <div>
            <h4>Free Shipping</h4>
            <p>On orders over $100</p>
          </div>
        </div>

        <div className="benefit-item">
          <FiShield />
          <div>
            <h4>Secure Payments</h4>
            <p>100% protected</p>
          </div>
        </div>

        <div className="benefit-item">
          <FiHeadphones />
          <div>
            <h4>24/7 Support</h4>
            <p>We're always here</p>
          </div>
        </div>

        <div className="benefit-item">
          <FiRefreshCw />
          <div>
            <h4>Easy Returns</h4>
            <p>Hassle free within 30 days</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
