
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import PurchaseCard from "./PurchaseCard";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import "./ProductDetailsContent.css";

function ProductDetailsContent() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        const currentProduct = data.find(
          (item) => String(item.id) === String(id)
        );

        if (!currentProduct) {
          throw new Error("Product not found");
        }

        const otherProducts = data
          .filter(
            (item) =>
              String(item.id) !== String(id) &&
              item.category === currentProduct.category
          )
          .slice(0, 4);

        setProduct(currentProduct);
        setRelatedProducts(otherProducts);
      })
      .catch(() => {
        setError("Unable to load this product.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="product-details-page">
        <p className="product-loading">
          Loading product...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <p className="product-error">
          {error || "Product not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>Shop</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-details-layout">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
        <PurchaseCard product={product} />
      </div>

      <ProductTabs product={product} />

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}

export default ProductDetailsContent;

