import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import "./CartItem.css";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-info">
        <p className="cart-item-category">{item.category}</p>

        <h3>{item.name}</h3>

        {item.selectedColor && (
          <p className="cart-item-color">
            Color: {item.selectedColor}
          </p>
        )}

        <p className="cart-item-price">
         ₦{item.price.toLocaleString()}
        </p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control">
          <button
            onClick={() =>
              decreaseQuantity(item.id, item.selectedColor)
            }
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              increaseQuantity(item.id, item.selectedColor)
            }
          >
            +
          </button>
        </div>

        <button
          className="remove-item"
          aria-label="Remove item"
          onClick={() =>
            removeFromCart(item.id, item.selectedColor)
          }
        >
          <FiTrash2 />
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;