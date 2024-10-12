import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './AdminStyles.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProduct from '../../components/ListProduct/ListProduct'

function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/listproduct' element={<ListProduct />} />
            </Routes>
        </div>
    )
}

export default Admin
