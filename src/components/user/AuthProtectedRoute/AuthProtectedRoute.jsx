import React from "react";
import { Navigate } from "react-router-dom";


export default function AuthProtectedRoute({ children }) {
  const userToken = localStorage.getItem("userToken");
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (userToken) {
   
    return <Navigate to="/" />;
  }
 
}
