import React from 'react'

import './NewsLetterStyles.css'

function NewsLetter() {
    return (
        <div className='newsLetter'>
            <h1>Get Exclusive Offers on Your Email</h1>
            <p>Subscribe to Our NewsLetter and Stay Updated</p>
            <div>
                <input type="email" placeholder='Your Email Id' name='' id='' />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter
