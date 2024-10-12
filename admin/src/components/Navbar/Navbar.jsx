import React from 'react'

import './NavbarStyles.css'
import navlogo from '../../Assets/nav-logo.svg'
import navProfileIcon from '../../Assets/nav-profile.svg'

function Navbar() {
    return (
        <div className='navbar'>
            <img className='nav-logo' src={navlogo} alt="" />
            <img src={navProfileIcon} className='nav-profile' alt="" />
        </div>
    )
}

export default Navbar
