
import {
  FaStar,
  FaBolt,
  FaCamera,
  FaDesktop,
  FaBatteryFull,
} from "react-icons/fa";
import "./ProductInfo.css";

function ProductInfo({ product }) {
  const highlightIcons = [
    <FaBolt />,
    <FaCamera />,
    <FaDesktop />,
    <FaBatteryFull />,
  ];

  return (
    <div className="product-info-section">
      <p className="product-category">
        {product.category}
      </p>

      <h1>{product.name}</h1>

      <div className="product-rating">
        <FaStar />

        <span>{product.rating}</span>

        <span>
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="product-price-row">
        <span className="product-price">
          ₦{product.price.toLocaleString()}
        </span>

        {product.oldPrice && (
          <span className="product-old-price">
            ₦{product.oldPrice.toLocaleString()}
          </span>
        )}

        {product.discount && (
          <span className="product-discount">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <p className="product-description">
        {product.description}
      </p>

      {product.highlights?.length > 0 && (
        <div className="product-features">
          <h3>Product Highlights</h3>

          <div className="highlight-list">
            {product.highlights.map((highlight, index) => (
              <div
                className="highlight-item"
                key={highlight.title}
              >
                <div className="highlight-icon">
                  {highlightIcons[index]}
                </div>

                <div className="highlight-content">
                  <h4>{highlight.title}</h4>

                  <p>{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;

