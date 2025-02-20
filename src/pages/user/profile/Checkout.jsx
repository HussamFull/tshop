import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext, useCart } from "../../../components/user/context/CartContext";

export default function Checkout() {
  const location = useLocation();
  const [cartItems,setCartItems ] =useState(null);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCartCount } =useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("userToken");
      const orderData = {
        address,
        phone,
      };

      // إنشاء الطلب
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BURL}/order`,
        orderData,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      console.log('test');
      // تفريغ السلة
      navigate(`/profile/orders`);
      setCartCount(0);
      toast.success("The request was created successfully! ");
      
    } catch (error) {
      toast.error("An error occurred: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };
  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(response);
      setCartItems(response.data.products);
      console.log(response.data.products);
      
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  // دالة حساب المجموع الكلي
  const calculateSubtotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.details.finalPrice;
    }, 0);
    setSubtotal(total);
    console.log(total,"here")
  };
 
useEffect(()=>{
getCart();
},[])
  return (
    <section className="checkout_area section_gap">
      <div className="container">
        <div className="billing_details">
          <div className="row">
            <div className="col-lg-8">
              <h3>Payment details</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="the address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <button 
                  className="main_btn"
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Request"}
                </button>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="order_box">
                <h2>Your orders</h2>
                <ul className="list">
                  {cartItems?cartItems.map(item => (
                    <li key={item.productId}>
                      <span>{item.details.name}</span>
                      <span className="middle">x {item.quantity}</span>
                      <span className="last">${(item.quantity * item.details.finalPrice).toFixed(2)}</span>
                    </li>
                  )):''}
                </ul>
                <div className="total_price">
                  <h4>Total</h4>
                  <h4>${cartItems?cartItems.reduce((sum, item) => sum + item.quantity * item.details.finalPrice, 0).toFixed(2):''}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}