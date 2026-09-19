
import { useContext } from "react";
import { Link } from "react-router";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import "./RelatedProducts.css";

function RelatedProducts({ products }) {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  return (
    <section className="related-products">
      <div className="related-heading">
        <div>
          <h2>Related Products</h2>
          <p>You might also like these products.</p>
        </div>

        <Link to="/shop">
          View All →
        </Link>
      </div>

      <div className="related-grid">
        {products.map((product) => {
          const isWishlisted = wishlist.find(
            (item) => item.id === product.id
          );

          return (
            <article
              className="related-card"
              key={product.id}
            >
              <div className="related-image">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                <button
                  className="related-wishlist"
                  onClick={() => toggleWishlist(product)}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {isWishlisted ? <FaHeart /> : <FiHeart />}
                </button>
              </div>

              <div className="related-info">
                <p className="related-category">
                  {product.category}
                </p>

                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>

                <div className="related-rating">
                  <FaStar />

                  <span>{product.rating}</span>

                  <span>
                    ({product.reviewCount})
                  </span>
                </div>

                <p className="related-price">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RelatedProducts;

