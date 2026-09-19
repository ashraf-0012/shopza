import { Link } from "react-router";
import { motion } from "framer-motion";
import "./Categories.css";

const categories = [
  {
    name: "Electronics",
    image: "/images/categories/electronics.png",
  },
  {
    name: "Fashion",
    image: "/images/categories/fashion.png",
  },
  {
    name: "Beauty",
    image: "/images/categories/beauty.png",
  },
  {
    name: "Home & Living",
    image: "/images/categories/Home & living.png",
  },
  {
    name: "Sports",
    image: "/images/categories/sports.png",
  },
  {
    name: "Accessories",
    image: "/images/categories/accessories.png",
  },
  {
    name: "Toys",
    image: "/images/categories/toys.png",
  },
];

function Categories() {
  return (
    <motion.section
      className="categories"
      id="categories"
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="categories-heading">
        <div>
          <h2>Shop by Category</h2>
          <p>Explore our popular categories</p>
        </div>

        <Link to="/shop">View all →</Link>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to="/shop"
            className="category-card"
            key={category.name}
          >
            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
              />

              <h3>{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

export default Categories;

