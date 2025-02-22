import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast, Flip } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../components/user/context/CartContext.jsx";
import Loading from "../../../components/user/loading/Loading.jsx";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import style from "./star.module.css";
import { UserContext } from "../../../components/user/context/UserContext.jsx";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { cartCount, setCartCount } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoding, setIsLoding] = useState(false);
  const { user } = useContext(UserContext);

  const onHoverStar = (num) => {
    setRating(num);
  };
  console.log(rating);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/products/${productId}`
      );
      setProduct(data.product);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const AddProductToCart = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/cart`,
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
        toast.success("Product added to Cart!", {
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
        console.log(cartCount);
        setCartCount(cartCount + 1);
        navigate("/cart");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleSubmitComment = async (e) => {
    // منع إعادة تحميل الصفحة عند الإرسال
    setIsLoading(true);
    try {
      // 1. التحقق من صحة البيانات قبل الإرسال
      // if (!comment.trim() || rating < 1 || rating > 5) {
      //   throw new Error("الرجاء إدخال تعليق صحيح وتقييم بين 1 و 5");
      // }

      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً");
      }

      // 2. إرسال البيانات
      const { data } = await axios.post(
        `${import.meta.env.VITE_BURL}/products/${productId}/review`,
        {
          comment: e.comment,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data);
      console.log("here osama");

      // 3. معالجة النجاح
      toast.success("تم إرسال التقييم بنجاح!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });

      // 4. تحديث قائمة التعليقات بدلاً من الاستبدال
      setReviews((prev) => [...prev, data.review]); // افترض أن الرد يحتوي على review

      // 5. إعادة تعيين الحقول
      setComment("");
      setRating(0);
    } catch (error) {
      // 6. معالجة الأخطاء بشكل دقيق
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`فشل الإرسال: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loading />{" "}
      </div>
    );
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
                <Link to={"/"}>Home</Link>
                <a>Product Details</a>
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
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    >
                      <img
                        width="50px"
                        src={product.mainImage.secure_url}
                        alt=""
                      />
                    </li>
                    {product.subImages.map((image, index) => (
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={index + 1}
                        key={index}
                      >
                        <img src={image.secure_url} alt="" width="50px" />
                      </li>
                    ))}
                  </ol>

                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src={product.mainImage.secure_url}
                        alt="First slide"
                      />
                    </div>
                    {product.subImages.map((image, index) => (
                      <div className="carousel-item" key={index}>
                        <img
                          className="d-block w-100"
                          src={image.secure_url}
                          alt={`Slide ${index + 2}`}
                        />
                      </div>
                    ))}
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
                  <button
                    onClick={() => AddProductToCart(product._id)}
                    class="main_btn"
                  >
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
                            src="./assets/img/product/single-product/review-1.png "
                            alt=""
                          />
                        </div>
                        <div class="media-body">
                          <h4>{user?.userName}</h4>
                          <h5>{user?.createdAt}</h5>
                        </div>
                      </div>
                      <div>
                        {reviews?.map((review, index) => (
                          <div
                            key={review.id || index}
                            style={{
                              marginBottom: "20px",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              {/* اسم المستخدم */}
                              <h4>
                                {review.createdBy?.userName || "مستخدم مجهول"}
                              </h4>

                              {/* التقييم */}
                              <div style={{ color: "#ffd700" }}>
                                {"★".repeat(Math.floor(review.rating))}
                                {review.rating % 1 !== 0 && "½"}
                              </div>
                            </div>

                            {/* نص التعليق */}
                            <p>{review.comment}</p>

                            {/* تاريخ التعليق */}
                            <small style={{ color: "#666" }}>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* create Post a comment   */}
                <div class="col-lg-6">
                  <div class="review_box">
                    <h4>Post a comment</h4>

                    <Form
                      onSubmit={handleSubmit(handleSubmitComment)}
                      class="row "
                    >
                      <FloatingLabel
                        controlId="name"
                        label="comment"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Your Comment"
                          {...register("comment")}
                        />
                        {/* {errors.comment && (
                <div className="text-danger small mt-1">
                  {errors.userName.message}
                </div>
              )} */}
                      </FloatingLabel>

                      <div class="col-md-12 text-right">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isLoding}
                          size="lg"
                        >
                          {isLoding ? "Creating Comment..." : "Create Comment"}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            {/*   rating    */}
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
                        <h4> {reviews.length}</h4>
                        <h6>({reviews.length} Reviews)</h6>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="rating_list">
                        <h3>Based on {reviews.length} Reviews</h3>
                        <ul class="list">
                          <li>
                            <a href="#">
                              5 Star
                              <i
                                className={`fa fa-star ${
                                  rating >= 1 ? style.fill : style.normal
                                }`}
                                onMouseEnter={() => {
                                  onHoverStar(1);
                                }}
                              ></i>
                              <i
                                className={`fa fa-star ${
                                  rating >= 2 ? style.fill : style.normal
                                }`}
                                onMouseEnter={() => {
                                  onHoverStar(2);
                                }}
                              ></i>
                              <i
                                className={`fa fa-star ${
                                  rating >= 3 ? style.fill : style.normal
                                }`}
                                onMouseEnter={() => {
                                  onHoverStar(3);
                                }}
                              ></i>
                              <i
                                className={`fa fa-star ${
                                  rating >= 4 ? style.fill : style.normal
                                }`}
                                onMouseEnter={() => {
                                  onHoverStar(4);
                                }}
                              ></i>
                              <i
                                className={`fa fa-star ${
                                  rating >= 5 ? style.fill : style.normal
                                }`}
                                onMouseEnter={() => {
                                  onHoverStar(5);
                                }}
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/*   end rating    */}

                {/*   Add Rating    */}
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
