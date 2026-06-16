import React from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className='sidebar'>
      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${currentPath === '/addproduct' || currentPath === '/' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="28" height="28" className="sidebar-icon">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
          </svg>
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${currentPath === '/listproduct' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="28" height="28" className="sidebar-icon">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="currentColor"/>
          </svg>
          <p>Product List</p>
        </div>
      </Link>
      <Link to='/orders' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${currentPath === '/orders' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="28" height="28" className="sidebar-icon">
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z" fill="currentColor"/>
          </svg>
          <p>Orders</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
