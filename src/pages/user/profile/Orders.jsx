import React from 'react'
import { useState , useEffect } from 'react';
import Loading from '../../../components/user/loading/Loading';



export default function Orders() {

  const [orders, setOrders] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getOrders = async () => {
      try {
          const { data } = await axios.get(`${import.meta.env.VITE_BURL}/order`);
          console.log(data);
          setOrders(data.orders);


      } catch (error) {
          console.log(error);
          setError(error.message);
          


      } finally {
          setIsLoading(false);
      }

  }




  useEffect(() => {
    setOrders();
  }, []);

  if (isLoading) {
     return <div> <Loading /> </div>;
   }
  if (error) {
      return <div>Error: {error}</div>
  }







  return (
    <>
     

<Container>
        <Row>
            <Col>
            <h2>Orders</h2>
            {orders.map((order, index) => (
              <Card key={index} style={{ width: '18rem', display: 'flex', justifyContent: 'center' }}>
                <Card.Img variant="top" src="holder.js/100px180" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example 
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
               ))}
            </Col>
        </Row>
      </Container>

      
      {/* Pagination */}
      {/* Previous Button */}
      {/* Next Button */}
      
      {/* Order Details Button */}
      
      {/* Order Details Modal */}

      {/* Add Order Button */}
      <button onClick={() => {
        // Add order logic here
      }}>Add Order</button>

      {/* Delete Order Button */}
      <button onClick={() => {
        // Delete order logic here
      }}>Delete Order</button>

      {/* Edit Order Button */}
      <button onClick={() => {
        // Edit order logic here
      }}>Edit Order</button>

      {/* Filter Orders Button */}
      <button onClick={() => {
        // Filter orders logic here
      }}>Filter Orders</button>

      {/* Sort Orders Button */}
      
    
    </>
  )
}
