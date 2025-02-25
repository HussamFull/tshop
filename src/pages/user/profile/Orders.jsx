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
import { toast, Bounce } from "react-toastify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("userToken");
    setError(null); // Clear any previous errors

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/order/cancel/${orderId}`,
        {}, // Request body (if needed)
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        // 204 No Content is also a success code for PATCH
        toast.success("Order canceled successfully!", {
          /* ... toast options ... */
        });
        console.log("Order canceled successfully");
        setOrders(orders.filter((o) => o._id !== orderId));
      } else {
        // More informative error handling:
        const errorMessage =
          response.data?.message ||
          response.data ||
          "Failed to cancel order. Server returned an error.";
        console.error("Failed to cancel order:", response.status, errorMessage); // Log status and message
        toast.error(errorMessage, {
          /* ... toast options ... */
        }); // Display error message to user
        setError(errorMessage); // Set error state
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while canceling the order.";
      toast.error(errorMessage, {
        /* ... toast options ... */
      });
      setError(errorMessage);
    }
  };
  ///// more code...
  function TriggerExample() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
      </Tooltip>
    );
  }
  return (
    <>
      {" "}
      <h1>Info Orders</h1>
      <Container>
        {orders.map((order, index) => (
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <Button
                    className="m-2"
                    variant={
                      order.status === "delivered"
                        ? "outline-success"
                        : order.status === "pending"
                        ? "outline-danger"
                        : order.status === "cancelled"
                        ? "outline-warning"
                        : "outline-info"
                    }
                  >
                    Order Status: {order.status}
                  </Button>
                  <Button variant={"outline-success"}>
                    Order Address: {order.address}
                  </Button>
                  <Button
                    onClick={() => cancelOrder(order._id)}
                    variant="outline-danger"
                  >
                    Cancel Order
                  </Button>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="w-100 d-flex justify-content-between align-items-center p-2">
                  <Button variant="outline-warning">
                    {" "}
                    phoneNumber: {order.phoneNumber}{" "}
                  </Button>

                  {order.couponName ? (
                    <Button variant="outline-warning">
                      couponName: {order.couponName}
                    </Button>
                  ) : null}

                  <Button variant="outline-warning">
                    paymentType: {order.paymentType}
                  </Button>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Title</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr key={product.productId._id}>
                        <td>
                          <img
                            src={product.productId.mainImage.secure_url}
                            alt={product.productId.name}
                            style={{ maxWidth: "50px" }}
                          />
                        </td>
                        <td>{product.productId.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.finalPrice}</td>
                      </tr>
                    ))}
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
