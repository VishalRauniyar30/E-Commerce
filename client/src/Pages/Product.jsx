import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { ShopContext } from '../Context/ShopContext'
import Breadcrum from '../Components/Breadcrum/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import ProductDescriptionBox from '../Components/ProductDescriptionBox/ProductDescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

function Product() {
    const { all_product } = useContext(ShopContext)
    const { productId } = useParams()
    const product = all_product.find((e) => e.id === Number(productId))

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <ProductDescriptionBox />
            <RelatedProducts />
        </div>
    )
}

export default Product
