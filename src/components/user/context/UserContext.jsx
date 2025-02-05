import React, { createContext } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export const  UserContext = createContext() 

export const UserContextProvider = ({children}) => {

    useEffect(() => {
        getUser();
    }, []);

    const [user, setUser] = useState(null );

    const [loading, setLoading] = useState(true);
    
    const getUser = async () => {
        const token = localStorage.getItem("userToken");
        try {
             const response = await axios.get(
          "https://ecommerce-node4.onrender.com/user/profile",
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }

    }




    return (
        <UserContext.Provider value={{  user , setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;