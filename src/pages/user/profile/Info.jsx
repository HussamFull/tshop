import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../../components/user/context/UserContext';
import Loading from '../../../components/user/loading/Loading';

export default function Info() {


  const {user , loading } = useContext(UserContext);
  return (
    <>
    <h1>Info Page</h1>
    <h1> User Name : {user?.userName}</h1>
    <h1> User Email : {user?.email}</h1>
    
 

    {loading && <div> <Loading /> </div>}


   



    
    </>
  )
}
