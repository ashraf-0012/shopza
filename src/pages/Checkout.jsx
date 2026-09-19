import { useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 50 ? 0 : 10;

  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    const order = {
      customer: formData,
      items: cart,
      subtotal,
      shipping,
      total,
      paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      setCart([]);
      setOrderPlaced(true);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add some products before checking out.</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Order Confirmed 🎉</h1>

          <p>
            Thank you for your order, {formData.fullName}.
          </p>

          <p>Your order has been placed successfully.</p>

          <Link to="/shop">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order by providing your details below.</p>
      </div>

      <div className="checkout-layout">
        <section className="checkout-form">
          {step === 1 && (
            <>
              <h2>Billing & Shipping Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="form-error">{errors.fullName}</p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="form-error">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="form-error">{errors.address}</p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <p className="form-error">{errors.city}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && (
                      <p className="form-error">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                    {errors.postalCode && (
                      <p className="form-error">{errors.postalCode}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="United Kingdom">
                        United Kingdom
                      </option>
                      <option value="United States">
                        United States
                      </option>
                    </select>

                    {errors.country && (
                      <p className="form-error">{errors.country}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="checkout-button"
                >
                  Continue to Payment →
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <div className="payment-section">
              <h2>Payment</h2>

              <p>
                Choose your preferred payment method to complete
                your order.
              </p>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>Credit / Debit Card</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>Cash on Delivery</span>
              </label>

              <button
                type="button"
                className="checkout-button"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

              <button
                type="button"
                className="back-button"
                onClick={() => setStep(1)}
              >
                ← Back to Shipping
              </button>
            </div>
          )}
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-products">
            {cart.map((item) => (
              <div
                className="checkout-product"
                key={`${item.id}-${item.selectedColor}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="checkout-product-info">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>

                <strong>  
                  ₦{(item.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>
              {shipping === 0
                ? "Free"
                : `₦${shipping.toLocaleString()}`}
            </span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;