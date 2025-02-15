import React from 'react'
//import CustomNavbar from './components/user/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/user/login/Login'
import Register from './pages/user/register/Register'
import { ToastContainer } from 'react-toastify';

import Home from './pages/user/home/Home'
import UserLayout from './layouts/UserLayout'
import Categories from './pages/user/category/Categories'
import Products from './pages/user/products/Products'

import CategoryProducts from './pages/user/products/CategoryProducts'
import ProductDetails from './pages/user/products/ProductDetails'
import Cart from './pages/user/cart/Cart'
import ProtectedRoute from './components/user/protectedRoute/ProtectedRoute'




import { CartContextProvider } from './components/user/context/CartContext'
import { UserContextProvider } from './components/user/context/UserContext'


import Profile from './pages/user/profile/Profile'
import Info from './pages/user/profile/Info'
import Orders from './pages/user/profile/Orders'
import AuthProtectedRoute from './components/user/AuthProtectedRoute/AuthProtectedRoute'
import ImageProfile from './pages/user/profile/ImageProfile'
import CreateOrder from './pages/user/profile/CreateOrder'









export default function App() {


  const router = createBrowserRouter(
    [
      {
        path:'/auth',
        element: 
        <AuthProtectedRoute>
            <AuthLayout />
        </AuthProtectedRoute>,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
      },
      {
        path: '/',
        element:
        <UserContextProvider>
        <CartContextProvider>
        
       
            <UserLayout />,
            
        </CartContextProvider>
        </UserContextProvider>
        ,
        children: [
          { path: '/', element: <Home /> },
          { path: 'categories', element: <Categories /> },
          { path: '/categories/:categoryId', element: <CategoryProducts /> },
          { path: 'products', element: <Products /> },
          { path: 'product/:productId', element: <ProductDetails /> },
          { path: 'cart', element:
            <ProtectedRoute>
            <Cart /> 
            </ProtectedRoute>
          },
          {
             path: 'profile', 
             element: <Profile /> ,
             children: [
               { path: 'info', element: <Info /> },
               { path: 'orders', element: <Orders /> },
               { path: 'createOrder', element: <CreateOrder /> },
               { path: 'imageProfile', element: <ImageProfile /> },
             ],
            
            
            },

        ],
      },
     
    ]
  )






  return (
    <>
     
    <ToastContainer />
    <RouterProvider router={router} />
    
    </>
  )
}
