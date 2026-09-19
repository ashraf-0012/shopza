import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiX,
} from "react-icons/fi";
import "./ProductGallery.css";

function ProductGallery({ product }) {
  const images = product.images || [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const showPreviousImage = () => {
    const newIndex =
      currentIndex === 0
        ? images.length - 1
        : currentIndex - 1;

    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const showNextImage = () => {
    const newIndex =
      currentIndex === images.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const selectImage = (image, index) => {
    setCurrentIndex(index);
    setSelectedImage(image);
  };

  return (
    <>
      <div className="product-gallery">
        <div className="product-thumbnails">
          {images.map((image, index) => (
            <button
              key={image}
              className={`thumbnail ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => selectImage(image, index)}
            >
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>

        <div className="product-main-image">
          {product.badge && (
            <span className="product-badge">
              {product.badge}
            </span>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                className="gallery-arrow gallery-arrow-left"
                onClick={showPreviousImage}
                aria-label="Previous image"
              >
                <FiChevronLeft />
              </button>

              <button
                className="gallery-arrow gallery-arrow-right"
                onClick={showNextImage}
                aria-label="Next image"
              >
                <FiChevronRight />
              </button>
            </>
          )}

          <button
            className="zoom-button"
            onClick={() => setIsZoomed(true)}
            aria-label="Zoom image"
          >
            <FiZoomIn />
          </button>
        </div>
      </div>

      {isZoomed && (
        <div
          className="zoom-overlay"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="zoom-close"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom"
          >
            <FiX />
          </button>

          <img
            src={selectedImage}
            alt={product.name}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ProductGallery;

