import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiPackage,
} from "react-icons/fi";

import "./Navbar.css";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/shop?search=${search}`);
    }
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img
          src="/images/404/404-image.png"
          alt="Shopza"
        />

        <span>
          SHOP<span>ZA</span>
        </span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-actions">
        <Link
          to="/wishlist"
          className="wishlist-icon"
          aria-label="Wishlist"
        >
          <FiHeart />

          <span className="wishlist-badge">
            {wishlistCount}
          </span>
        </Link>

        <Link
          to="/orders"
          className="orders-icon"
          aria-label="Orders"
        >
          <FiPackage />
        </Link>

        <Link
          to="/cart"
          className="cart-icon"
          aria-label="Cart"
        >
          <FiShoppingCart />

          <span className="cart-badge">
            {cartCount}
          </span>
        </Link>

        <Link to="/login" aria-label="Login">
          <FiUser />
        </Link>
      </div>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

