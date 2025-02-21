import React from "react";
import { useState, useEffect } from "react";
import Loading from "../../../components/user/loading/Loading";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useCart } from "../../../components/user/context/CartContext";
import Table from "react-bootstrap/Table";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

const OrderItem = ({ order }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.product.title}</td>
      <td>{order.quantity}</td>
      <td>{order.product.price * order.quantity}</td>
    </tr>
  );
};

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
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (orders.length === 0) {
    // Handle the case where there are no orders
    return <div>No orders found.</div>;
  }

  return (
    <>
      {" "}
      <h1>Info Orders</h1>
      <Container>
        {orders.map((order, index) => (
          <Accordion defaultActiveKey="0" key={index}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Order Address : {order.address} &&&nbsp;
                <Badge
                  bg={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "pending"
                      ? "danger"
                      : "success"
                  }
                >
                  {" "}
                  {/*Simplified Badge logic */}
                  Order Status: {order.status}
                </Badge>
                {/*  <Link to={`/profile/order/${order._id}`}>See Order Details</Link> */}
              </Accordion.Header>
              <Accordion.Body>
                phoneNumber: {order.phoneNumber}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product Image</th> {/* Changed to Image */}
                      <th>Product Title</th>
                      <th>Quantity</th>
                      <th>Unit Price</th> {/* Added Unit Price */}
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map(
                      (
                        product // Map through each product
                      ) => (
                        <tr key={product.productId._id}>
                          {" "}
                          {/* Added key for each row - use product ID */}
                          <td>
                            <img
                              src={product.productId.mainImage.secure_url}
                              alt={product.productId.name}
                              style={{ maxWidth: "50px" }}
                            />{" "}
                            {/* Display image */}
                          </td>
                          <td>{product.productId.name}</td>
                          <td>{product.quantity}</td>
                          <td>{product.unitPrice}</td>{" "}
                          {/* Display unit price */}
                          <td>{product.finalPrice}</td>{" "}
                          {/* Display final price for this product */}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </Container>
    </>
  );
}
