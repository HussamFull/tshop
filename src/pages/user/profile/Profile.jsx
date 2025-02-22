import React from 'react'
import CuostmSidebar from '../../../components/user/sidebar/CustomSidebar'
import { Badge, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';






export default function Profile() {
  return (
    <>


      <Container  fluid className="p-0  " >
      <h5>
        <Badge bg="success">Profile</Badge>
        </h5>
        <Row >
        
          <Col md={3}  >
          <CuostmSidebar />
          
           
          </Col>
          <Col md={7} >
          <div className="border p-4 rounded-3 shadow-sm align-item-center ">
              <h2 className="text-center mb-3">
                Welcome to
                <h1 className="syria-shop">
                  <span className="syria">Syria </span>
                  <span className="shop">Shop</span>
                </h1>
              </h2>
              </div>
            <Outlet />
          </Col>
        </Row>
        </Container>    
    </>
  )
}
