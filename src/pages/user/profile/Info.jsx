import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../../components/user/context/UserContext';
import Loading from '../../../components/user/loading/Loading';
import Table from 'react-bootstrap/Table';


export default function Info() {


  const {user , loading } = useContext(UserContext);
  return (
    <>
    <h1>Info Page</h1>
   

    <Table  striped bordered hover size="lg" >
      <thead>
        <tr>
          <td colSpan={3}>Info Page</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>User Name :</td>
          <td>{user?.userName}</td>
        </tr>
        <tr>
          <td>User Email :</td>
          <td>{user?.email}</td>
        </tr>
        <tr>
          <td> Role :</td>
          <td>{user?.role}</td>
        </tr>
        <tr>
          <td>User Cart Items Count :</td>
          <td>{user?.cartItems?.length}</td>
        </tr>
        <tr>
          <td>User Orders Count :</td>
          <td>{user?.orders?.length}</td>
        </tr>
        <tr>
          <td>User Address :</td>
          <td>{user?.address?.address}</td>
        </tr>
        <tr>
          <td>User Total Orders Amount :</td>
          <td>{user?.orders?.reduce((acc, curr) => acc + curr.totalPrice, 0)}</td>
        </tr>
        <tr>
          <td>User Favorite Products Count :</td>
          <td>{user?.favoriteProducts?.length}</td>
        </tr>


        {loading && <div> <Loading /> </div>}

        <tr>
  <td>User Created At :</td>
  <td>
    {user?.createdAt instanceof Date 
      ? user.createdAt.toLocaleDateString() 
      : user?.createdAt 
        ? new Date(user.createdAt).toLocaleDateString() 
        : "N/A" // Or any other placeholder like "-" or ""
    }
  </td>
</tr>
<tr>
  <td>User Updated At :</td>
  <td>
    {user?.updatedAt instanceof Date
      ? user.updatedAt.toLocaleDateString()
      : user?.updatedAt
        ? new Date(user.updatedAt).toLocaleDateString()
        : "N/A"
    }
  </td>
</tr>


        
      </tbody>
    </Table>
 

    {loading && <div> <Loading /> </div>}


   



    
    </>
  )
}
