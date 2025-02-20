import React from 'react'

import CustomNavbar from '../components/user/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/footer/Footer'
import CartContextProvider from '../components/user/context/CartContext'


export default function UserLayout() {
  return (
    <>
    <CartContextProvider>
    <CustomNavbar  />
    <Outlet />
    </CartContextProvider>
    
    
    <Footer />
    </>
  )
}
