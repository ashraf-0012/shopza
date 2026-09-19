import "./ShopHeader.css";

function ShopHeader() {
  return (
    <section className="shop-header">
      <div className="shop-header-text">
        <h1>Shop</h1>
       <p>Explore a curated collection of top-quality products handpicked for you — from everyday essentials to standout finds, all at prices that make sense.</p>
      </div>

      <div className="shop-header-image">
        <img src="/images/shop/shop-banner.png" alt="Shopping cart illustration" />
      </div>
    </section>
  );
}

export default ShopHeader;