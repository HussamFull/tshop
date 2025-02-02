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

//import { CartContextProvider } from './components/user/context/cartContext'
import { CartContextProvider } from './components/user/context/CartContext'

export default function App() {


  const router = createBrowserRouter(
    [
      {
        path:'/auth',
        element: <AuthLayout />,
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
        element: <UserLayout />,
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

        ],
      },
     
    ]
  )






  return (
    <>
     <CartContextProvider>
    <ToastContainer />
    <RouterProvider router={router} />
    </CartContextProvider>
    </>
  )
}
