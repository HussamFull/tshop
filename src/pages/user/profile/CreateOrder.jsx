import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


//import {CartContext} from '../../../components/user/context/CartContext';







export default function CreateOrder() {

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${import.meta.env.VITE_BURL}/order/${orderId}`,
          {
            headers: {
              Authorization: `Tariq__${token}`
            }
          }
        );
        setOrder(response.data.order);
      } catch (error) {
        toast.error("حدث خطأ في جلب بيانات الطلب");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>جاري التحميل...</div>;
  if (!order) return <div>الطلب غير موجود</div>;


    
      

 

   
    
  return (
    <>
      CreateOrder


      <section className="order_details section_gap">
      <div className="container">
        <h3 className="title_confirmation">شكراً لتسوقك معنا!</h3>
        <div className="row">
          <div className="col-lg-6">
            <div className="order_details_table">
              <h2>تفاصيل الطلب</h2>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">المنتج</th>
                      <th scope="col">الكمية</th>
                      <th scope="col">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((item) => (
                      <tr key={item.productId}>
                        <td>{item.details.name}</td>
                        <td>x {item.quantity}</td>
                        <td>${(item.quantity * item.details.finalPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><b>المجموع الكلي</b></td>
                      <td />
                      <td>${order.finalPrice.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="order_details_contact">
              <h2>معلومات الشحن</h2>
              <ul>
                <li>
                  <span>العنوان:</span> {order.address}
                </li>
                <li>
                  <span>الهاتف:</span> {order.phone}
                </li>
                <li>
                  <span>حالة الطلب:</span> {order.status}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
   

    

    </>
  )
}
