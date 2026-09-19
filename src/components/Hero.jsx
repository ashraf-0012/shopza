import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Hero.css";

const slides = [
  {
    subtitle: "New season, new style",
    title: "Everything you need, all in one place.",
    description:
      "Discover quality products at great prices, made for everyday living.",
    button: "Shop Now",
    image: "/images/hero/hero-1.png",
  },
  {
    subtitle: "Big summer sale",
    title: "Save more on your favorite products.",
    description:
      "Enjoy amazing deals across selected products while the offer lasts.",
    button: "Shop Deals",
    image: "/images/hero/hero-2.png",
  },
  {
    subtitle: "Everyday essentials",
    title: "Quality products. Better prices.",
    description:
      "Find products you'll love, all carefully selected for Shopza.",
    button: "Explore Now",
    image: "/images/hero/hero-3.png",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % slides.length
    );
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className="hero">
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <p className="hero-subtitle">
              {slide.subtitle}
            </p>

            <h1>{slide.title}</h1>

            <p className="hero-description">
              {slide.description}
            </p>

            <div className="hero-buttons">
              <Link to="/shop" className="hero-button">
                {slide.button} →
              </Link>

              <a
                href="#categories"
                className="hero-button secondary"
              >
                Explore Categories
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-image">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slide.image}
            alt={slide.title}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      <button
        className="hero-arrow hero-arrow-left"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        <FiChevronLeft />
      </button>

      <button
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FiChevronRight />
      </button>

      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={currentSlide === index ? "active" : ""}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;

