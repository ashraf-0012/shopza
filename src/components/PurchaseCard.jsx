
import { useContext, useState } from "react";
import {
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiRefreshCw,
  FiLock,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import "./PurchaseCard.css";

import { CartContext } from "../context/CartContext.jsx";
import { WishlistContext } from "../context/WishlistContext";

function PurchaseCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.find(
    (item) => item.id === product.id
  );

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="purchase-card">
      <h2>Purchase</h2>

      <div className="purchase-price">
        ₦{product.price.toLocaleString()}
      </div>

      {product.colors?.length > 0 && (
        <div className="purchase-option">
          <div className="option-heading">
            <span>Color</span>
            <span>{selectedColor}</span>
          </div>

          <div className="color-options">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`color-swatch ${
                  selectedColor === color ? "selected" : ""
                }`}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color}`}
                title={color}
              >
                <span
                  className={`color-circle color-${color
                    .toLowerCase()
                    .replace(" ", "-")}`}
                ></span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="purchase-option">
        <div className="option-heading">
          <span>Quantity</span>
        </div>

        <div className="quantity-control">
          <button
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        className="add-cart-button"
        onClick={() =>
          addToCart(product, quantity, selectedColor)
        }
      >
        <FiShoppingCart />
        Add to Cart
      </button>

      <button
        className="wishlist-button-purchase"
        onClick={() => toggleWishlist(product)}
      >
        {isWishlisted ? <FaHeart /> : <FiHeart />}

        {isWishlisted
          ? "Remove from Wishlist"
          : "Add to Wishlist"}
      </button>

      <div className="purchase-info">
        <div className="purchase-info-item">
          <FiTruck />

          <div>
            <h4>Free Shipping</h4>
            <p>Free shipping on orders over $50</p>
          </div>
        </div>

        <div className="purchase-info-item">
          <FiRefreshCw />

          <div>
            <h4>Easy Returns</h4>
            <p>Easy 30-day returns</p>
          </div>
        </div>

        <div className="purchase-info-item">
          <FiLock />

          <div>
            <h4>Secure Payment</h4>
            <p>Your payment information is secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCard;

