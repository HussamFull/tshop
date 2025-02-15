import React from 'react'
//import CustomNavbar from '../components/user/navbar/Navbar'

import { Outlet } from 'react-router-dom'
import UserContextProvider from '../components/user/context/UserContext'
import CartContextProvider from '../components/user/context/CartContext'


export default function AuthLayout() {

  
  return (
    <>
   {/* <CustomNavbar /> */}
   <CartContextProvider>
      <UserContextProvider>
          <Outlet />
      </UserContextProvider>
    </CartContextProvider>
    
    
    </>
  )
}
