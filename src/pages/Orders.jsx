import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
+   fetch("https://shopza-4wb7.onrender.com/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const updateOrderStatus = async (id, status) => {
    const response = await fetch(
      `https://shopza-4wb7.onrender.com/orders/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (response.ok) {
      setOrders(
        orders.map((order) =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );
    }
  };

  const totalRevenue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  return (
    <main className="orders-page">
      <div className="orders-header">
        <h1>Orders</h1>
        <p>Manage and view all customer orders.</p>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="stat-card">
          <span>Total Revenue</span>
          <strong>₦{totalRevenue.toLocaleString()}</strong>
        </div>

        <div className="stat-card">
          <span>Pending Orders</span>
          <strong>{pendingOrders}</strong>
        </div>

        <div className="stat-card">
          <span>Completed Orders</span>
          <strong>{completedOrders}</strong>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <h2>Order #{order.id}</h2>
                  <p>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="order-status-control">
                  <span className="order-status">
                    {order.status}
                  </span>

                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(
                        order.id,
                        event.target.value
                      )
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">
                      Processing
                    </option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">
                      Completed
                    </option>
                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>

              <div className="customer-info">
                <h3>Customer</h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customer.fullName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.customer.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.customer.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.customer.address},{" "}
                  {order.customer.city},{" "}
                  {order.customer.state}
                </p>

                <p>
                  <strong>Country:</strong>{" "}
                  {order.customer.country}
                </p>
              </div>

              <div className="order-products">
                <h3>Products</h3>

                {order.items.map((item) => (
                  <div
                    className="order-product"
                    key={`${item.id}-${item.selectedColor}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <h4>{item.name}</h4>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      {item.selectedColor && (
                        <p>
                          Color: {item.selectedColor}
                        </p>
                      )}
                    </div>

                    <strong>
                      ₦
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-bottom">
                <p>
                  Payment:{" "}
                  <strong>
                    {order.paymentMethod === "card"
                      ? "Credit / Debit Card"
                      : "Cash on Delivery"}
                  </strong>
                </p>

                <div className="order-total">
                  <span>Total</span>
                  <strong>

                    ₦{order.total.toLocaleString()}


                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;