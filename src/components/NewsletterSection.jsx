import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiTruck,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";
import "./NewsletterSection.css";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Thanks for subscribing!");
    setEmail("");
  }

  return (
    <motion.section
      className="newsletter-section"
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="newsletter-left">
        <div className="newsletter-icon">
          <FiMail />
        </div>

        <div className="newsletter-text">
          <h3>Join our newsletter</h3>

          <p>
            Get the latest updates on new products and exclusive offers.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            required
          />

          <button type="submit">
            Subscribe
          </button>

          {message && (
            <p className="newsletter-message">
              {message}
            </p>
          )}
        </form>
      </div>

      <div className="newsletter-perks">
        <div className="perk">
          <FiTruck className="perk-icon" />

          <div>
            <h4>Free Shipping</h4>
            <p>On orders over $100</p>
          </div>
        </div>

        <div className="perk">
          <FiRefreshCw className="perk-icon" />

          <div>
            <h4>Easy Returns</h4>
            <p>30 days return policy</p>
          </div>
        </div>

        <div className="perk">
          <FiShield className="perk-icon" />

          <div>
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default NewsletterSection;

