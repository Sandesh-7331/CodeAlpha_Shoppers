import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="admin-content" style={{ display: 'flex', flexWrap: 'wrap', minHeight: 'calc(100vh - 80px)' }}>
        <Sidebar />
        <div className="admin-page-content" style={{ flex: 1, padding: '30px', background: '#f6f6f6' }}>
          <Routes>
            <Route path="/" element={<AddProduct />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
