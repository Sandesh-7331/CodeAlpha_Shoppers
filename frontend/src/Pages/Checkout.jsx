import React, { useContext, useState } from 'react'
import './CSS/Checkout.css'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { getTotalCartAmount, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    payment: 'cod'
  });

  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10,12}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number (10-12 digits)';
    return errs;
  }

  const placeOrder = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="checkout-success">
        <div className="checkout-success-box">
          <div className="checkout-tick">✓</div>
          <h1>Order Placed!</h1>
          <p>Thank you, <strong>{form.name}</strong>! Your order of <strong>Rs.{getTotalCartAmount()}</strong> has been placed successfully.</p>
          <p className="checkout-delivery-info">📦 Estimated delivery to <strong>{form.city}</strong> in 3-5 business days.</p>
          <p className="checkout-payment-info">💳 Payment: <strong>{form.payment === 'cod' ? 'Cash on Delivery' : form.payment === 'upi' ? 'UPI Payment' : 'Credit / Debit Card'}</strong></p>
          <button onClick={() => { navigate('/') }} className="checkout-home-btn">Continue Shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className='checkout'>
      <div className="checkout-container">
        <div className="checkout-left">
          <h1>Delivery Details</h1>
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={changeHandler}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="checkout-error">{errors.name}</span>}
            </div>
            <div className="checkout-field">
              <label>Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={changeHandler}
                placeholder="House No., Street, Area..."
                rows={3}
              />
              {errors.address && <span className="checkout-error">{errors.address}</span>}
            </div>
            <div className="checkout-field">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={changeHandler}
                placeholder="Enter your city"
              />
              {errors.city && <span className="checkout-error">{errors.city}</span>}
            </div>
            <div className="checkout-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={changeHandler}
                placeholder="Enter 10-digit mobile number"
              />
              {errors.phone && <span className="checkout-error">{errors.phone}</span>}
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <h1>Order Summary</h1>
          <div className="checkout-summary-box">
            <div className="checkout-summary-row">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <div className="checkout-summary-row">
              <p>Shipping</p>
              <p className="free-tag">FREE</p>
            </div>
            <hr />
            <div className="checkout-summary-row total-row">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="checkout-payment-options">
            <label className={`payment-option ${form.payment === 'cod' ? 'selected' : ''}`}>
              <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={changeHandler} />
              <span className="payment-icon">💵</span>
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when your order arrives</p>
              </div>
            </label>
            <label className={`payment-option ${form.payment === 'upi' ? 'selected' : ''}`}>
              <input type="radio" name="payment" value="upi" checked={form.payment === 'upi'} onChange={changeHandler} />
              <span className="payment-icon">📱</span>
              <div>
                <strong>UPI Payment</strong>
                <p>Google Pay, PhonePe, Paytm</p>
              </div>
            </label>
            <label className={`payment-option ${form.payment === 'card' ? 'selected' : ''}`}>
              <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={changeHandler} />
              <span className="payment-icon">💳</span>
              <div>
                <strong>Credit / Debit Card</strong>
                <p>Visa, Mastercard, RuPay</p>
              </div>
            </label>
          </div>

          <button className="checkout-place-btn" onClick={placeOrder}>
            PLACE ORDER  →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
