import React from 'react'
import axios from 'axios';

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



export default function Categories() {

    const [categories, setCategories] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
            console.log(data);
            setCategories(data.categories);


        } catch (error) {
            console.error(error);
            setError(error.message);
            


        } finally {
            setIsLoading(false);
        }

    }




    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }




    return (
        <>

            <div className="cat_product_area section_gap">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-12">
                            <div className="latest_product_inner">
                                <div className="row">

                                    {categories.map((category) => (
                                        <div className="col-lg-4 col-md-6" key={category._id}>
                                            <div className="single-product">
                                                <div className="product-img">
                                                    <img className="card-img" src={category.image.secure_url} alt />
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
                                                    <Link to={`/categories/${category._id}`} className="d-block">

                                                        <h4> {category.name}</h4>
                                                    </Link>
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

    )
}
