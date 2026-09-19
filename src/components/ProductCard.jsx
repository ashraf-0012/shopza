import { useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.find(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    const selectedColor = product.colors?.[0] || "";

    addToCart(product, 1, selectedColor);
  };

  return (
    <motion.article
      className="product-card"
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <motion.button
          className="wishlist-button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          whileTap={{
            scale: 0.8,
          }}
          animate={{
            scale: isWishlisted ? 1.15 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          {isWishlisted ? <FaHeart /> : <FiHeart />}
        </motion.button>
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <div className="product-rating">
          <FaStar />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="product-bottom">
          <p className="product-price">
            ₦{product.price.toLocaleString()}
          </p>

          <button
            className="cart-button"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
