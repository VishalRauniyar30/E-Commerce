import React, { useEffect, useState } from 'react'

import './ListProductStyles.css'
import cross_icon from '../../Assets/cross_icon.png'

function ListProduct() {

    const [allproducts, setAllProducts] = useState([])

    const fetchInfo = async() => {
        await fetch('http://localhost:5000/allproducts')
        .then((res) => res.json())
        .then((data) => { setAllProducts(data) })
    }
    useEffect(() => {
        fetchInfo()
    }, [])

    const removeProduct = async (id) => {
        await fetch('http://localhost:5000/removeproduct', {
            method : 'POST',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ id : id })
        })
        await fetchInfo()
    }

    return (
        <div className='list-product'> 
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p style={{ marginLeft: '75px' }}>Products</p>
                <p>Title</p>
                <p style={{ marginRight: '25px' }}>Old Price</p>
                <p style={{ marginRight: '25px' }}>New Price</p>
                <p style={{ marginRight: '45px' }}>Category</p>
                <p style={{ marginRight: '75px' }}>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <React.Fragment key={product.id}>
                            <div key={index} className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="" className="listproduct-product-icon" />
                                <p>{product.name}</p>
                                <p>₹{product.old_price}</p>
                                <p>₹{product.new_price}</p>
                                <p>{product.category}</p>
                                <img src={cross_icon} onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' alt="" />
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