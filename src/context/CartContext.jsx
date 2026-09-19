import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, selectedColor) => {
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === selectedColor
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
            item.selectedColor === selectedColor
            ? {
              ...item,
              quantity: item.quantity + quantity,
            }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
          selectedColor,
        },
      ]);
    }
  };

  const increaseQuantity = (id, selectedColor) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.selectedColor === selectedColor
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id, selectedColor) => {
    setCart(
      cart.map((item) =>
        item.id === id &&
          item.selectedColor === selectedColor &&
          item.quantity > 1
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      )
    );
  };

  const removeFromCart = (id, selectedColor) => {
    setCart(
      cart.filter(
        (item) =>
          !(item.id === id && item.selectedColor === selectedColor)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };