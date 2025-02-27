import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../../components/user/loading/Loading";

export default function CategoryProducts() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/products/category/${categoryId}`
      );
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
     return <div> <Loading /> </div>;
   }

  return (
    <>
      <div className="cat_product_area section_gap">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-12">
              <div className="latest_product_inner">
                <div className="row">
                  {products.map((product) => (
                    <div className="col-lg-4 col-md-6" key={product._id}>
                      <div className="single-product">
                        <div className="product-img">
                          <img
                            className="card-img"
                            src={product.mainImage.secure_url}
                            alt
                          />
                          <div className="p_icon">
                            <a href="#">
                              <i className="ti-eye" />
                            </a>
                            <a href="#">
                              <i className="ti-heart" />
                            </a>
                            <a href="#">
                              <i className="ti-shopping-cart" />
                            </a>
                          </div>
                        </div>
                        <div className="product-btm">
                          <a href="#" className="d-block">
                            <h4> {product.name}</h4>
                          </a>
                          <div class="mt-3">
                            <span className="mr-4">${product.finalPrice}</span>
                            <del>${product.price} </del>
                          </div>
                          
                                     <Link to={`/product/${product._id}`} className="btn btn-primary mt-3">Details</Link>
                        </div>
                      </div>
                      
                    </div>
                   

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
