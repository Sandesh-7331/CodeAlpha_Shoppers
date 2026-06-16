import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" className="logo" />
        <div className="nav-title">
          <h1>SHOPPER</h1>
          <p>Admin Panel</p>
        </div>
      </div>
      <div className="nav-profile">
        <svg viewBox="0 0 24 24" width="40" height="40" className="profile-icon">
          <circle cx="12" cy="12" r="12" fill="#ff4141" />
          <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  )
}

export default Navbar
