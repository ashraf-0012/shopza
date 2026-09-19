import "./ShopToolbar.css";

function ShopToolbar({
  sortOption,
  setSortOption,
  productCount,
}) {
  return (
    <div className="shop-toolbar">
      <p>Showing {productCount} products</p>

      <div className="sort-control">
        <label htmlFor="sort">Sort by:</label>

        <select
          id="sort"
          value={sortOption}
          onChange={(event) =>
            setSortOption(event.target.value)
          }
        >
          <option value="default">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="name-az">Name: A to Z</option>
          <option value="name-za">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}

export default ShopToolbar;
