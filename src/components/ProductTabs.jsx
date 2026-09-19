
import { useState } from "react";
import "./ProductTabs.css";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
    },
    {
      id: "specifications",
      label: "Specifications",
    },
    {
      id: "reviews",
      label: `Reviews (${product.reviewCount})`,
    },
  ];

  return (
    <section className="product-tabs-section">
      <div className="product-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`product-tab ${
              activeTab === tab.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="product-tab-content">
        {activeTab === "description" && (
          <div className="description-content">
            <div className="description-text">
              <h2>Crystal Clear Sound, All Day Comfort</h2>

              <p>{product.description}</p>

              <p>
                Designed to deliver a premium experience, this product
                combines quality materials, reliable performance, and
                thoughtful design for everyday use.
              </p>
            </div>

            {product.highlights?.length > 0 && (
              <div className="description-features">
                <h3>Key Features</h3>

                <ul>
                  {product.highlights.map((highlight) => (
                    <li key={highlight.title}>
                      <strong>{highlight.title}</strong>
                      <span>{highlight.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="specifications-content">
            <h2>Specifications</h2>

            {product.specifications ? (
              <div className="specifications-list">
                {Object.entries(product.specifications).map(
                  ([name, value]) => (
                    <div
                      className="specification-row"
                      key={name}
                    >
                      <span>{name}</span>
                      <strong>{value}</strong>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>No specifications available.</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-content">
            <h2>Customer Reviews</h2>

            <div className="review-summary">
              <strong>{product.rating}</strong>

              <span>
                out of 5 ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="review-message">
              Customer reviews and ratings will be displayed here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductTabs;
