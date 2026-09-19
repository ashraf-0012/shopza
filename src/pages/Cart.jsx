import { useContext } from "react";
import { Link } from "react-router";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your items before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to see them here.</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            <h2>Cart Items</h2>

            {cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedColor}`}
                item={item}
              />
            ))}
          </section>

          <CartSummary />
        </div>
      )}
    </main>
  );
}

export default Cart;