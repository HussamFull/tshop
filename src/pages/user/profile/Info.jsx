import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../../components/user/context/UserContext';

export default function Info() {

    const {user , loading } = useContext(UserContext);
  return (
    <>
    <h1>Info Page</h1>
    <h1> User Name : {user.userName}</h1>
    <h1> User Email : {user.email}</h1>
    


    {loading && <p>Loading...</p>}


   



    
    </>
  )
}
