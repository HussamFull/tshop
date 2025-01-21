import React from 'react'
import CustomNavbar from './components/user/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/user/login/Login'
import Register from './pages/user/register/Register'
import { ToastContainer } from 'react-toastify';


export default function App() {


  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
        ],
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
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
