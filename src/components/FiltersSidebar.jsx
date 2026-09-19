import { FiSliders, FiChevronUp } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import "./FiltersSidebar.css";

const categories = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home & Living",
  "Sports",
  "Accessories",
  "Toys",
];

const priceRanges = [
  "₦0 - ₦10,000",
  "₦10,001 - ₦25,000",
  "₦25,001 - ₦50,000",
  "₦50,001 - ₦100,000",
  "₦100,001+",
];

const ratings = [
  "4.5 & above",
  "4.0 & above",
  "3.5 & above",
];

function FiltersSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedRating,
  setSelectedRating,
  clearAllFilters,
}) {
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item !== category
        )
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        category,
      ]);
    }
  };

  return (
    <aside className="filters-sidebar">
      <div className="filters-heading">
        <div className="filters-title">
          <FiSliders />
          <h3>Filters</h3>
        </div>

        <button
          className="clear-all"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>

      <div className="filter-group">
        <div className="filter-group-heading">
          <h4>Category</h4>
          <FiChevronUp />
        </div>

        {categories.map((category) => (
          <label className="filter-option" key={category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <div className="filter-group-heading">
          <h4>Price Range</h4>
          <FiChevronUp />
        </div>

        {priceRanges.map((range) => (
          <label className="filter-option" key={range}>
            <input
              type="checkbox"
              checked={selectedPriceRange === range}
              onChange={() =>
                setSelectedPriceRange(
                  selectedPriceRange === range ? "" : range
                )
              }
            />
            <span>{range}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <div className="filter-group-heading">
          <h4>Rating</h4>
          <FiChevronUp />
        </div>

        {ratings.map((rating) => (
          <label className="filter-option" key={rating}>
            <input
              type="checkbox"
              checked={selectedRating === rating}
              onChange={() =>
                setSelectedRating(
                  selectedRating === rating ? "" : rating
                )
              }
            />

            <span className="rating-option">
              <FaStar />
              {rating}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}

export default FiltersSidebar;