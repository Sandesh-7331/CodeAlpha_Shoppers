import React, { useEffect, useState } from 'react'
import './ListProduct.css'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((resp) => resp.json())
      .then((data) => { setAllProducts(data) })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const remove_product = async (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      })
      await fetchInfo();
    }
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img src={product.image} className='listproduct-product-icon' alt="" />
                <p>{product.name}</p>
                <p>Rs.{product.old_price}</p>
                <p>Rs.{product.new_price}</p>
                <p>{product.category}</p>
                <div onClick={() => { remove_product(product.id) }} className="listproduct-remove-container">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="listproduct-remove-icon">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#ff4141" />
                  </svg>
                </div>
              </div>
              <hr />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default ListProduct
