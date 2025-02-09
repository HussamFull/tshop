import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";


export default function Category() {
  const [categories, setCategories] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/categories/active`
      );
      console.log(data);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <div> <Loading /> </div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>

      <section className="banner_area">
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="main_title">
            <h2><span>Featured product</span></h2>
            <p>Bring called seed first of third give itself now ment</p>
          </div>
        </div>
      </div>
      </div>
      </section>

    

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3.3}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        
        <div className="cat_product_area section_gap">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-12">
                <div className="latest_product_inner">
                  <div className="row">
                    {categories.map((category) => (
                      <SwiperSlide
                        className="col-lg-4 col-md-6"
                        key={category._id}
                      >
                        <div className="single-product">
                          <div className="product-img">
                            <img
                              className="card-img"
                              src={category.image.secure_url}
                              alt
                            />
                            <div className="p_icon">
                              <Link to={`/categories/${category._id}`}>
                                <i className="ti-eye" />
                              </Link>
                              <a href="#">
                                <i className="ti-heart" />
                              </a>
                              <a href="#">
                                <i className="ti-shopping-cart" />
                              </a>
                            </div>
                          </div>
                          <div className="product-btm">
                            <Link
                              to={`/categories/${category._id}`}
                              className="d-block"
                            >
                              <h4> {category.name}</h4>
                            </Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Swiper>

      {/*  

    <h1>Categories</h1>


    <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3.3}
            navigation
            loop={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        
     
    >

         {categories.map((category) => (
          <SwiperSlide key={category._id}
          >
            <div className="card " style={{ width: '18rem' }}>
              <img src={category.image.secure_url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

    </Swiper>

    */}
    </>
  );
}
