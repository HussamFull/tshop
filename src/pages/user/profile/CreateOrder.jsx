import React, { useState, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import {CartContext} from '../../../components/user/context/CartContext';







export default function CreateOrder() {
    const { cart } = useContext(CartContext); 
    const [order, setOrder] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        products: cart
      });
      
    const handleChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value });
      };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send order to the server
        console.log('Order submitted:', order);
      };

    
      

 

   
    
  return (
    <>
      CreateOrder


      <Container>
        <Row>
            <Col>
              <Card style={{ width: '18rem', display: 'flex', justifyContent: 'center' }}>
                <Card.Img variant="top" src="holder.js/100px180" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example 
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
        </Row>
      </Container>
   

    

    </>
  )
}
