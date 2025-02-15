import React, { createContext, useState, useEffect, useContext  } from "react";
import axios from "axios";




export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  //const [loading, setLoading] = useState(true);
  useEffect(() => {

     
  getCart();

  }, []);

   // دالة تحديث العداد
   const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };



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
      //setLoading(false);
    } catch (error) {
      console.log("Error fetching cart:", error);
      setCartCount(0);
    }
    finally {
      //setLoading(false);
    }
  };
 


  return (
    <CartContext.Provider value={{ cartCount, setCartCount , cart, 
      setCart,  updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);

//export default CartContextProvider;
export default CartContextProvider;
