import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/user/loading/Loading";

import { toast, Flip, Bounce } from "react-toastify";
import { Button, Card } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../../components/user/context/CartContext";



export default function Cart() {
  //const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const [items, setItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { 
    cart, 
    setCart,
    cartCount,
    updateCartCount 
  } = useCart();

  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(response);
      setCart(response.data.products);
      console.log(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
 // دالة حساب المجموع الكلي
 const calculateSubtotal = (cartItems) => {
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.quantity * item.details.finalPrice);
  }, 0);
  setSubtotal(total);
};


  useEffect(() => {
    getCart();
    updateCartCount(cart); // تحديث العداد تلقائيًا
      calculateSubtotal(cart);
     
    
  }, [cart]);
  

  const deleteItem = async (productId) => {
    try {
      // احصل على التوكن من التخزين المحلي
      const token = localStorage.getItem("userToken");

      // قم بإرسال طلب التحديث باستخدام axios
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/removeItem`,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (data.message === "success") {
        toast.success("The product has been successfully removed from the cart !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setCart(prev => prev.filter(item => item.productId !== productId));



        calculateSubtotal(cart.filter(item => item.productId !== productId)); // تحديث المجموع بعد الحذف

        setCartCount(prev => prev - 1);
        toast.success("Product removed successfully!");
        navigate("/");
      }

      // طباعة البيانات المستلمة إلى الكونسول
      console.log(data);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
    }

    getCart();
    
    // قم بتحديث سلة المشتريات بعد الحذف
  };

  const deleteCart = async () => { 
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/clear`,
        {}, // إضافة كائن بيانات فارغ إذا لم تكن هناك حاجة لبيانات
        {
          headers: {
            Authorization: `Tariq__${token}`, // تأكد من أن هذه الصيغة صحيحة حسب متطلبات الخادم
          },
        }
      );
  
      // تحقق من الاستجابة بناءً على ما يعيده الخادم فعليًا
      if (data.message === "success") {
        setCart([]);
        
        // مثال بناءً على هيكل الاستجابة المتوقع
        toast.success("Cart deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        
        
        setTimeout(() => navigate("/"), 1500); // تأخير بسيط لرؤية الإشعار
      } else {
        console.error("Unexpected response:", data);
        toast.error("Failed to delete cart. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
      toast.error("An error occurred while deleting the cart.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
     
      navigate("/");
      // قم بتحديث سلة المشتريات بعد الحذف
      getCart();
    }finally {
      setIsDeleting(false);
    }
   

  };
 



  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (cart.length === 0 && !isLoading) {
    return    <div 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      width: '100%'
    }}
  >
    <Card 
      border="success" 
      style={{ 
        width: '18rem', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}
    >
      <Card.Header className="bg-success    text-white">
        Empty Cart
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ margin: '1rem 0' }}>
          <FiShoppingCart size={40} className="text-success" />
        </Card.Title>
        <Card.Text>
          No products in cart.
        </Card.Text>
        <Button 
          variant="success" 
          as={Link} 
          to="/"
          style={{ marginTop: '1rem' }}
        >
          Start Shopping
        </Button>
      </Card.Body>
    </Card>
  </div>
  
  
  }
  


 


  async function incQty(productId) {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `${import.meta.env.VITE_BURL}/cart/incraseQuantity`,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId == productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });

    console.log("Incremented");
    console.log(productId);
  }

  //incQtym

  {
    /*  */
  }
  const incQtym = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      
      // الحصول على العنصر الحالي من السلة
      const currentItem = cart.find(item => item.productId === productId);
      
      // إذا كانت الكمية الحالية 1، قم بحذف العنصر بدلاً من الإنقاص
      if (currentItem.quantity === 1) {
        await deleteItem(productId); // استدعاء دالة الحذف
        return;
      }
  
      // إذا كانت الكمية أكبر من 1، قم بالإنقاص
      await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/decraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
  
      setCart(prev => prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // التأكد من عدم النزول تحت 1
          : item
      ));
      
    } catch (error) {
      toast.error("Error updating quantity");
    }
  };
  return (
    <>
      {/*================Home Banner Area =================*/}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h2>Cart</h2>
                <p>Very us move be blessed multiply night</p>
              </div>
              <div className="page_link">
                <Link to={"/"}>Home</Link>
                <a>Cart</a>
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
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src={item.details.mainImage.secure_url}
                              alt
                              width="100px"
                            />
                          </div>
                          <div className="media-body">
                            <p>{item.details.name}</p>

                            <button
                              className="btn btn-danger"
                              onClick={() => deleteItem(item.productId)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <del>
                          {" "}
                          <h5>$ {item.details.price}</h5>
                        </del>
                        <h5>$ {item.details.finalPrice}</h5>
                      </td>
                      <td>
                        <div className="gap-2 d-md-flex justify-content-center">
                          <button
                            onClick={() => incQty(item.productId)}
                            className="main_btn "
                          >
                            +
                          </button>

                          <span className=" btn btn-outline-dark ">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => incQtym(item.productId)}
                            className="main_btn"
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>
                        <h5>$ {(item.quantity * item.details.finalPrice).toFixed(2)}</h5>
                      </td>
                    </tr>
                  ))}

                  <tr className="bottom_button">
                    <td>
                      <button onClick={() => deleteCart()} className="btn btn-danger" href="#">
                        Delete Cart
                      </button>
                    </td>
                    
                    <td />
                    <td />
                    <td>
                      <div className="cupon_text">
                        <input type="text" placeholder="Coupon Code" />
                        <a className="main_btn" href="#">
                          Apply
                        </a>
                        <a className="gray_btn" href="#">
                          Close Coupon
                        </a>
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
                      <h5>${subtotal.toFixed(2)}</h5>
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
                     
                        <input type="text" placeholder="Postcode/Zipcode" />
                        <a className="gray_btn" href="#">
                          Update Details
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="out_button_area">
                    <td />
                    <td />
                    <td />
                    <td>
                      <div className="checkout_btn_inner">
                        <a className="gray_btn" href="#">
                          Continue Shopping
                        </a>
                        <a className="main_btn" href="#">
                          Proceed to checkout
                        </a>
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
  );
}
