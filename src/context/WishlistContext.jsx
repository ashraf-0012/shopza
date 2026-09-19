import { createContext, useState } from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    const existingItem = wishlist.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );
    } else {
      setWishlist([
        ...wishlist,
        product
      ]);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export { WishlistContext, WishlistProvider };
