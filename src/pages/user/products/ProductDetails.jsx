import React from "react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast, Flip } from "react-toastify";

import { useNavigate } from "react-router-dom";





export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products/${productId}`
      );
      setProduct(data.product);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const AddProductToCart = async (id)=>{
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/cart`,
        {
          productId: productId,
          
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }

      );
      if (response.status == 201) {
        toast.success('Product added to Cart!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        navigate('/cart');
        
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    
  }


  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1></h1>

      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h2>Product Details</h2>
                <p>Very us move be blessed multiply night</p>
              </div>
              <div className="page_link">
                <a href="index.html">Home</a>
                <a href="single-product.html">Product Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*   <!--================Single Product Area =================-->
       */}
      <div class="product_image_area">
        <div class="container">
          <div class="row s_product_inner">
            <div class="col-lg-6">
              <div class="s_product_img">
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      class="active"
                    >
                      <img src={product.mainImage.secure_url} alt="" />
                    </li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    >
                      <img src={product.subImages.secure_url} alt="" />
                    </li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    >
                      <img src={product.subImages.secure_url} alt="" />
                    </li>
                  </ol>

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        class="d-block w-100"
                        src={product.subImages.secure_url}
                        alt="First slide"
                      />
                    </div>

                    <div class="carousel-item">
                      <img
                        class="d-block w-100"
                        src={product.subImages.secure_url}
                        alt="Second slide"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        class="d-block w-100"
                        src={product.subImages.secure_url}
                        alt="Third slide"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 offset-lg-1">
              <div class="s_product_text">
                <h3>{product.name}</h3>
                <h2>
                  ${product.finalPrice}{" "}
                  <span>
                    <del>${product.price} </del>
                  </span>
                </h2>
                <ul class="list">
                  <li>
                    <a href="#">
                      {" "}
                      <span>Availibility</span> : {product.status}
                    </a>
                  </li>
                </ul>
                <p>{product.description}</p>
                <div class="product_count">
                  <label for="qty">Quantity:</label>
                  <input
                    type="text"
                    name="qty"
                    id="sst"
                    maxlength="12"
                    value="1"
                    title="Quantity:"
                    class="input-text qty"
                  />
                  <button
                    onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                    class="increase items-count"
                    type="button"
                  >
                    <i class="lnr lnr-chevron-up"></i>
                  </button>
                  <button
                    onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) &amp;&amp; sst > 0 ) result.value--;return false;"
                    class="reduced items-count"
                    type="button"
                  >
                    <i class="lnr lnr-chevron-down"></i>
                  </button>
                </div>
                <div class="card_area">
                  <button onClick={()=> AddProductToCart(product._id)} class="main_btn" >
                    Add to Cart
                  </button>
                  <a class="icon_btn" href="#">
                    <i class="lnr lnr lnr-diamond"></i>
                  </a>
                  <a class="icon_btn" href="#">
                    <i class="lnr lnr lnr-heart"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*   end  */}

      {/*   <!--================Product Description Area =================-->
       */}
      <section class="product_description_area">
        <div class="container">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Description
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Specification
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Comments
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                id="review-tab"
                data-toggle="tab"
                href="#review"
                role="tab"
                aria-controls="review"
                aria-selected="false"
              >
                Reviews
              </a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <p>{product.description}</p>
              <p>{product.description}</p>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <h5>Width</h5>
                      </td>
                      <td>
                        <h5>128mm</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Height</h5>
                      </td>
                      <td>
                        <h5>508mm</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Depth</h5>
                      </td>
                      <td>
                        <h5>85mm</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Weight</h5>
                      </td>
                      <td>
                        <h5>52gm</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Quality checking</h5>
                      </td>
                      <td>
                        <h5>yes</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Freshness Duration</h5>
                      </td>
                      <td>
                        <h5>03days</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>When packeting</h5>
                      </td>
                      <td>
                        <h5>Without touch of hand</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Each Box contains</h5>
                      </td>
                      <td>
                        <h5>60pcs</h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="comment_list">
                    <div class="review_item">
                      <div class="media">
                        <div class="d-flex">
                          <img
                            src="../../../../public/assets/img/product/single-product/review-1.png "
                            alt=""
                          />
                        </div>
                        <div class="media-body">
                          <h4>Blake Ruiz</h4>
                          <h5>12th Feb, 2017 at 05:56 pm</h5>
                          <a class="reply_btn" href="#">
                            Reply
                          </a>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo
                      </p>
                    </div>
                    <div class="review_item reply">
                      <div class="media">
                        <div class="d-flex">
                          <img
                            src="../../../../public/assets/img/product/single-product/review-2.png "
                            alt=""
                          />
                        </div>
                        <div class="media-body">
                          <h4>Blake Ruiz</h4>
                          <h5>12th Feb, 2017 at 05:56 pm</h5>
                          <a class="reply_btn" href="#">
                            Reply
                          </a>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo
                      </p>
                    </div>
                    <div class="review_item">
                      <div class="media">
                        <div class="d-flex">
                          <img
                            src="../../../../public/assets/img/product/single-product/review-3.png "
                            alt=""
                          />
                        </div>
                        <div class="media-body">
                          <h4>Blake Ruiz</h4>
                          <h5>12th Feb, 2017 at 05:56 pm</h5>
                          <a class="reply_btn" href="#">
                            Reply
                          </a>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="review_box">
                    <h4>Post a comment</h4>
                    <form
                      class="row contact_form"
                      action="contact_process.php"
                      method="post"
                      id="contactForm"
                      novalidate="novalidate"
                    >
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            placeholder="Your Full name"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            id="number"
                            name="number"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            name="message"
                            id="message"
                            rows="1"
                            placeholder="Message"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12 text-right">
                        <button
                          type="submit"
                          value="submit"
                          class="btn submit_btn"
                        >
                          Submit Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade show active"
              id="review"
              role="tabpanel"
              aria-labelledby="review-tab"
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="row total_rate">
                    <div class="col-6">
                      <div class="box_total">
                        <h5>Overall</h5>
                        <h4>{product.avgRating}</h4>
                        <h6>(03 Reviews)</h6>
                      </div>
                    </div>


                    <div class="col-6">
                      <div class="rating_list">
                        <h3>Based on 3 Reviews</h3>
                        <ul class="list">
                          <li>
                            <a href="#">
                              5 Star
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i> 01
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              4 Star
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i> 01
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              3 Star
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i> 01
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              2 Star
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i> 01
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              1 Star
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i> 01
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="review_list">
                    <div class="review_item">
                      <div class="media">
                        <div class="d-flex">
                          <img
                            src="../../../../public/assets/img/product/single-product/review-1.png "
                            alt=""
                          />
                        </div>


                        <div class="media-body">
                          <h4>Blake Ruiz</h4>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo
                      </p>
                    </div>
                    <div class="review_item">
                      <div class="media">
                        <div class="d-flex">
                          <img
                            src="../../../../public/assets/img/product/single-product/review-2.png "
                            alt=""
                          />
                        </div>
                        <div class="media-body">
                          <h4>Blake Ruiz</h4>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo
                      </p>
                    </div>
                    <div class="review_item">
                      <div class="media">
                        <div class="d-flex">
                          <img
                            src="../../../../public/assets/img/product/single-product/review-3.png "
                            alt=""
                          />
                        </div>
                        <div class="media-body">
                          <h4>Blake Ruiz</h4>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="review_box">
                    <h4>Add a Review</h4>
                    <p>Your Rating:</p>
                    <ul class="list">
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                    </ul>
                    <p>Outstanding</p>
                    <form
                      class="row contact_form"
                      action="contact_process.php"
                      method="post"
                      id="contactForm"
                      novalidate="novalidate"
                    >
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            placeholder="Your Full name"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            id="number"
                            name="number"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            name="message"
                            id="message"
                            rows="1"
                            placeholder="Review"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12 text-right">
                        <button
                          type="submit"
                          value="submit"
                          class="btn submit_btn"
                        >
                          Submit Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*   <!--================End Product Description Area =================-->
       */}
    </>
  );
}
