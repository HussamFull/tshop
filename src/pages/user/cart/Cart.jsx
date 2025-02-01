import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';







export default function Cart() {

  const [cart , setCart] = useState(null);
  const [isLoading , setIsLoading] = useState(true);
  
  const getCart = async ()=>{
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('https://ecommerce-node4.onrender.com/cart',
      {
        headers: {
                     Authorization: `Tariq__${token}`,
              },
      }
    );
      console.log(response);
      setCart(response.data.products);
      console.log(response.data.products);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  
  if(isLoading){
    return <div>Loading...</div>
  }
  
  if(!cart){
    return <div>No products in cart</div>
  }




  const incQty = async (productId)=>{

    const token = localStorage.getItem('userToken');
    const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
    {
      productId : productId
    },
    {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    }
    );
    getCart();
    console.log('Incremented');
    console.log(productId);
  }

  //incQtym

  const incQtym = async (productId)=>{

    const token = localStorage.getItem('userToken');
    const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
    {
      productId : productId
    },
    {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    }
    );
    getCart();
    console.log('Incremented');
    console.log(productId);
  }
















  return (
    <>

{/*================Home Banner Area =================*/}
    <section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="container">
          <div
            className="banner_content d-md-flex justify-content-between align-items-center"
          >
            <div className="mb-3 mb-md-0">
              <h2>Cart</h2>
              <p>Very us move be blessed multiply night</p>
            </div>
            <div className="page_link">
              <Link to={'/'}  >Home</Link>
              <a >Cart</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*================End Home Banner Area =================*/}




     {/*<!--================Cart Area =================-->*/}
   <section className="cart_area">
  <div className="container">
    <div className="cart_inner">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>




          {cart.map(item=>

            <tr key={item._id} >
              <td>
                <div className="media">
                  <div className="d-flex">
                    <img src={item.details.mainImage.secure_url} alt width="100px" />
                  </div>
                  <div className="media-body">
                    <p>{item.details.name}</p>
                  </div>
                </div>
              </td>
              <td>
             <del> <h5>$ {item.details.price}</h5></del>
                <h5>$ {item.details.finalPrice}</h5>
              </td>
              <td>
              
               <div className="gap-2 d-md-flex justify-content-center">
               
                 

                  <button onClick={()=>incQty(item.productId)}  className="main_btn"  >   
                    +
                  </button>
                  {item.quantity}
                  <button onClick={()=>incQtym(item.productId)} className="main_btn" > 
                    -
                  </button> 
                   
                </div>
              </td>
              <td>
                <h5>$  {item.quantity * item.details.finalPrice}</h5>
              </td>
            </tr>
          )}





            <tr className="bottom_button">
              <td>
                <a className="gray_btn" href="#">Update Cart</a>
              </td>
              <td />
              <td />
              <td>
                <div className="cupon_text">
                  <input type="text" placeholder="Coupon Code" />
                  <a className="main_btn" href="#">Apply</a>
                  <a className="gray_btn" href="#">Close Coupon</a>
                </div>
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td>
                <h5>Subtotal</h5>
              </td>
              <td>
                <h5>$2160.00</h5>
              </td>
            </tr>
            <tr className="shipping_area">
              <td />
              <td />
              <td>
                <p>Shipping</p>
              </td>
              
              <td>
                <div className="shipping_box">
                  <ul className="list">
                    <li>
                      <a href="#">Flat Rate: $5.00</a>
                    </li>
                    <li>
                      <a href="#">Free Shipping</a>
                    </li>
                    <li>
                      <a href="#">Flat Rate: $10.00</a>
                    </li>
                    <li className="active">
                      <a href="#">Local Delivery: $2.00</a>
                    </li>
                  </ul>
                  <h6>
                    Calculate Shipping
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </h6>
                  <select className="shipping_select">
                    <option value={1}>Bangladesh</option>
                    <option value={2}>India</option>
                    <option value={4}>Pakistan</option>
                  </select>
                  <select className="shipping_select">
                    <option value={1}>Select a State</option>
                    <option value={2}>Select a State</option>
                    <option value={4}>Select a State</option>
                  </select>
                  <input type="text" placeholder="Postcode/Zipcode" />
                  <a className="gray_btn" href="#">Update Details</a>
                </div>
              </td>
            </tr>
            <tr className="out_button_area">
              <td />
              <td />
              <td />
              <td>
                <div className="checkout_btn_inner">
                  <a className="gray_btn" href="#">Continue Shopping</a>
                  <a className="main_btn" href="#">Proceed to checkout</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

     {/*<!--================End Cart Area =================-->*/}




    
    
    
    
    
    
    
    </>
  )
}
