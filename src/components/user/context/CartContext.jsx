import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async()=> {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BURL}/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartCount(response.data.count);
      console.log(response.data.count);
    } catch (error) {
      console.log("Error fetching cart:", error);
      setCartCount(0);
    }
  };
  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
