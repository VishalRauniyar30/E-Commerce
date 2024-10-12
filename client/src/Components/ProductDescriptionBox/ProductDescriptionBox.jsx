import React from 'react'

import './ProductDescriptionBoxStyles.css'

function ProductDescriptionBox() {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">
                    Description
                </div>
                <div className="descriptionbox-nav-box fade">
                    Reviews (122)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>
                    A E-Commerce Website is an Online Platform that Facilitates The Buying and Selling of Products Or Services 
                    Over The Internet. It Serves as a Virtual Marketplace Where Businesses and Individuals Can Showcase Their 
                    Products, Interact With Customers, and Conduct Transactions Without The Need for a Physical Presence 
                    E-Commerce Websited Have Gained Immense Popularity Due to Their Convenience, Accessibility, and The Global 
                    Reach They Offer.
                </p>
                <p>
                    E-Commerce Websites Typically Display Products or Services Along With Detailed Descriptions, Images, Prices, 
                    and Any Available Variations(e.g Sizes, Colors). Each Product Usually Has Its Own Dedicated Page With 
                    Relevant Information.
                </p>
            </div>
        </div>
    )
}

export default ProductDescriptionBox
