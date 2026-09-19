import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "./ProductGrid.css";

function ProductGrid({
  products,
  loading,
  error,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return (
      <div>
        <h3>No products found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default ProductGrid;
