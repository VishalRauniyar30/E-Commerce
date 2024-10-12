import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import nav_dropdown_icon from '../Assests/nav_dropdown.png'
import './NavbarStyles.css'
import { ShopContext } from '../../Context/ShopContext'

function Navbar() {

    const { getTotalCartItems } = useContext(ShopContext)
    const [menu, setMenu] = useState("shop")

    const menuRef = useRef()

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>
                    <Link style={{ textDecoration : 'none', color : 'black' }} to={'/'}>MOHIKART</Link>
                </p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown_icon} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration : 'none', color : 'black' }} to={'/'}>Shop</Link> {menu === "shop" ? <hr/> : <></>} 
                </li>
                <li onClick={() => setMenu("mens")}>
                    <Link style={{ textDecoration : 'none', color : 'black' }} to={'/mens'}>Men</Link> {menu === "mens" ? <hr/> : <></>} 
                </li>
                <li onClick={() => setMenu("womens")}>
                    <Link style={{ textDecoration : 'none', color : 'black' }} to={'/womens'}>Women</Link> {menu === "womens" ? <hr/> : <></>} 
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link style={{ textDecoration : 'none', color : 'black' }} to={'/kids'}>Kids</Link> {menu === "kids" ? <hr/> : <></>} 
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ?
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }} className='button1'>
                        Logout
                    </button> 
                :
                    <Link to={'/login'}><button className='button1'>Login</button> </Link>
                }
                <Link to={'/cart'} >
                    <img src={cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">
                    {getTotalCartItems()}
                </div>
            </div>
        </div>
    )
}

export default Navbar