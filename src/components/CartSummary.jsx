import { useContext } from "react";
import { Link } from "react-router";
import { FiLock, FiShield } from "react-icons/fi";
import { CartContext } from "../context/CartContext";

function CartSummary() {
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 50 ? 0 : 5;

  const total = subtotal + shipping;

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <aside className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal ({itemCount} items)</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span className="shipping-free">
          {shipping === 0
            ? "Free"
            : `$${shipping.toLocaleString()}`}
        </span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <strong>${total.toLocaleString()}</strong>
      </div>

      <Link to="/checkout" className="checkout-button">
        <FiLock />
        <span>Proceed to Checkout</span>
      </Link>

      <div className="secure-message">
        <FiShield />
        <span>Your information is safe and secure</span>
      </div>
    </aside>
  );
}

export default CartSummary;