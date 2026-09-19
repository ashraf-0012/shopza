import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const featuredProducts = data.filter(
          (product) => product.featured === true
        );

        setProducts(featuredProducts);
      });
  }, []);

  return (
    <motion.section
      className="featured-products"
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
      <div className="featured-heading">
        <div>
          <h2>Featured Products</h2>
          <p>Discover some of our most popular products.</p>
        </div>

        <Link to="/shop">View all →</Link>
      </div>

      <div className="featured-grid">
        {products.map((product) => {
          const isWishlisted = wishlist.find(
            (item) => item.id === product.id
          );

          return (
            <div className="featured-card" key={product.id}>
              <div className="featured-image">
                <img
                  src={product.image}
                  alt={product.name}
                />

                <button
                  className="wishlist-button"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Add to wishlist"
                >
                  {isWishlisted ? <FaHeart /> : <FiHeart />}
                </button>
              </div>

              <div className="featured-info">
                <h3>{product.name}</h3>

                <p className="featured-rating">
                  <FaStar className="star-icon" />

                  <span className="rating-number">
                    {product.rating}
                  </span>

                  <span className="rating-count">
                    ({product.reviewCount})
                  </span>
                </p>

                <p className="featured-price">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default FeaturedProducts;

