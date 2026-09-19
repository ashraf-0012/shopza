import { useContext } from "react";
import { Link } from "react-router";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import "./Wishlist.css";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const selectedColor = product.colors?.[0] || "";

    addToCart(product, 1, selectedColor);
  };

  return (
    <main className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>

        <p>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <FiHeart />

          <h2>Your wishlist is empty</h2>

          <p>
            Save products you love and they will appear here.
          </p>

          <Link to="/shop">Continue Shopping</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article
              className="wishlist-card"
              key={product.id}
            >
              <div className="wishlist-image">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                <button
                  className="wishlist-remove"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Remove from wishlist"
                >
                  <FiHeart />
                </button>
              </div>

              <div className="wishlist-info">
                <p className="wishlist-category">
                  {product.category}
                </p>

                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>

                <div className="wishlist-rating">
                  <FaStar />

                  <span>{product.rating}</span>

                  <span>({product.reviewCount})</span>
                </div>

                <div className="wishlist-bottom">
                  <p className="wishlist-price">
                    ₦{product.price.toLocaleString()}
                  </p>

                  <button
                    className="wishlist-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;

