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
    </div>
  )
}

export default Sidebar
