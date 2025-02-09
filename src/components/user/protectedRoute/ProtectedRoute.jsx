import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
import { UserContext } from "../context/UserContext.jsx";

export default function ProtectedRoute({ children }) {
  const userToken = localStorage.getItem("userToken");
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!userToken) {
    toast.success("You cannot access the cart page unless you login !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
    return <Navigate to="/auth/login" />;
  }
  return children;
}
