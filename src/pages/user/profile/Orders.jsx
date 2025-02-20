import React from "react";
import { useState, useEffect } from "react";
import Loading from "../../../components/user/loading/Loading";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useCart } from "../../../components/user/context/CartContext";
import Table from "react-bootstrap/Table";
import { Badge } from "react-bootstrap";

export default function Orders() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getOrders = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BURL}/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(data);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loading />{" "}
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Info Orders</h1>

      <Container>
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Col>
            <h2>Orders</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {orders.map((order, index) => (
                <Card key={index} style={{ width: "18rem", margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                    }}
                  />
                  <Card.Body >
                    <Card.Title> {order.address}</Card.Title>
                    <Card.Text>{order.phoneNumber}</Card.Text>
                    <Card.Text>paymentType: {order.paymentType}</Card.Text>
                    <Card.Text>
                      {order.status === "delivered" && (
                         <Badge bg="success">{order.status}</Badge>
                      )}
                      {order.status === "pending" && (
                        <Badge bg="danger">{order.status}</Badge>
                      )}

                      {order.status !== "pending" &&
                        order.status !== "delivered" && (
                          <Badge>{order.status}</Badge>
                        )}
                    </Card.Text>

                    <Button variant="primary">Go to Product </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/*  
   <Table  striped bordered hover size="lg" >
     <thead>
       <tr>
         <td colSpan={3}>Info Orders</td>
       </tr>
     </thead> 
     {orders.map((order, _id) => (
     <tbody>
       <tr  key={_id} >
         <td>User Address :</td>
         <td>{order.address}</td>
       </tr>
       <tr>
         <td>finalPrice :</td>
         <td>{order.finalPrice}</td>
       </tr>
       <tr>
         <td> phoneNumber :</td>
         <td>{order.phoneNumber}</td>
       </tr>
       <tr>
         <td>Order Status :</td>
         <td>{order.status}</td>
       </tr>

       <tr>
         <td>Products Ordered:</td>
         <td></td>
         </tr>
       </tbody>

    
       ))}
     
     
     

      
   </Table>





    
 
 /*}
      
      {/* Pagination */}
      {/* Previous Button */}
      {/* Next Button */}

      {/* Order Details Button */}

      {/* Order Details Modal */}

      {/* Add Order Button */}
      <button
        onClick={() => {
          // Add order logic here
        }}
      >
        Add Order
      </button>

      {/* Delete Order Button */}
      <button
        onClick={() => {
          // Delete order logic here
        }}
      >
        Delete Order
      </button>

      {/* Edit Order Button */}
      <button
        onClick={() => {
          // Edit order logic here
        }}
      >
        Edit Order
      </button>

      {/* Filter Orders Button */}
      <button
        onClick={() => {
          // Filter orders logic here
        }}
      >
        Filter Orders
      </button>

      {/* Sort Orders Button */}
    </>
  );
}
