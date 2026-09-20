import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";
import "./ShopContent.css";
import ShopToolbar from "./ShopToolbar";

function ShopContent() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
   fetch("https://shopza-4wb7.onrender.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesPrice =
      selectedPriceRange === "" ||
      (selectedPriceRange === "₦0 - ₦10,000" &&
        product.price <= 10000) ||
      (selectedPriceRange === "₦10,001 - ₦25,000" &&
        product.price >= 10001 &&
        product.price <= 25000) ||
      (selectedPriceRange === "₦25,001 - ₦50,000" &&
        product.price >= 25001 &&
        product.price <= 50000) ||
      (selectedPriceRange === "₦50,001 - ₦100,000" &&
        product.price >= 50001 &&
        product.price <= 100000) ||
      (selectedPriceRange === "₦100,001+" &&
        product.price >= 100001);

    const matchesRating =
      selectedRating === "" ||
      (selectedRating === "4.5 & above" &&
        product.rating >= 4.5) ||
      (selectedRating === "4.0 & above" &&
        product.rating >= 4.0) ||
      (selectedRating === "3.5 & above" &&
        product.rating >= 3.5);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating
    );
  });

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      if (sortOption === "rating-high") {
        return b.rating - a.rating;
      }

      if (sortOption === "name-az") {
        return a.name.localeCompare(b.name);
      }

      if (sortOption === "name-za") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    }
  );

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange("");
    setSelectedRating("");
    setSortOption("default");
  };

  return (
    <section className="shop-content">
      <FiltersSidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        clearAllFilters={clearAllFilters}
      />

      <div className="shop-products">
        <ShopToolbar
          sortOption={sortOption}
          setSortOption={setSortOption}
          productCount={sortedProducts.length}
        />

        <ProductGrid
          products={sortedProducts}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
}

export default ShopContent;
