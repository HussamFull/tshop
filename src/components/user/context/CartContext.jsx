import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';



export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {

    // State for cart count
    const [cartCount, setCartCount] = useState(0);

    // State for cart items
    const getCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get('https://ecommerce-node4.onrender.com/cart',
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );

            setCartCount(response.data.count);
            console.log(response.data.count);


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);


    return <CartContext.Provider value={{ cartCount, setCartCount }}>
        {children}
    </CartContext.Provider>

}


export default CartContextProvider;