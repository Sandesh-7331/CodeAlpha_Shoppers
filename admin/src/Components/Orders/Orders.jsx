import React, { useEffect, useState } from 'react'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:4000/allorders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  const paymentLabel = (method) => {
    if (method === 'cod') return 'Cash on Delivery';
    if (method === 'upi') return 'UPI';
    if (method === 'card') return 'Card';
    return method;
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className='orders-panel'>
      <div className="orders-header">
        <h2>All Orders</h2>
        <button className="orders-refresh-btn" onClick={fetchOrders}>↻ Refresh</button>
      </div>

      {loading ? (
        <div className="orders-loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <p>No orders yet. Orders will appear here once customers checkout.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <div className="order-number">Order #{orders.length - index}</div>
                <div className="order-date">{formatDate(order.date)}</div>
                <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
              </div>

              <div className="order-card-body">
                <div className="order-customer-info">
                  <h3>👤 Customer Details</h3>
                  <p><strong>Name:</strong> {order.customerName}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>City:</strong> {order.city}</p>
                  <p><strong>Payment:</strong> {paymentLabel(order.paymentMethod)}</p>
                </div>

                <div className="order-items-info">
                  <h3>🛍️ Items Ordered</h3>
                  <table className="order-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <img src={item.image} alt={item.name} className="order-item-img" />
                          </td>
                          <td>{item.name}</td>
                          <td>Rs.{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>Rs.{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="order-card-footer">
                <span className="order-total">Total: <strong>Rs.{order.totalAmount}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
