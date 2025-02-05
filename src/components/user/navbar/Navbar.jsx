import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import login  from '../../../pages/user/login/Login'
import register from '../../../pages/user/register/Register'
import Cart from '../../../pages/user/cart/Cart'
import { CartContext } from '../context/CartContext'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'




export default function CustomNavbar() {

  const navigate = useNavigate();


  const {cartCount} = useContext(CartContext);
  const {user , loading} = useContext(UserContext);





  const logout = ()=>{
    localStorage.removeItem('userToken');

    setUser(null);



    navigate('/auth/login');
    

  }





  return (
     <header className="header_area">
        
        <div className="main_menu">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light w-100">
              {/* Brand and toggle get grouped for better mobile display */}
              <Link className="navbar-brand logo_h" to={'/'}>
                <img src="./assets/img/logo.png" alt="" />
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse offset w-100" id="navbarSupportedContent">
                <div className="row w-100 mr-0">
                  <div className="col-lg-7 pr-0">
                    <ul className="nav navbar-nav center_nav pull-right">
                      <li className="nav-item active">
                        <Link className="nav-link"  to={'/'} >Home</Link>
                      </li>
                      <li className="nav-item submenu dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                          aria-expanded="false">Shop</a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link className="nav-link" to={'/Categories'}>Shop Category</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={'/Products'}>Shop Product</Link>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="single-product.html">Product Details</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="checkout.html">Product Checkout</a>
                          </li>
                          <li className="nav-item">
                             <Link  to={'Cart'} className="nav-link" >Shopping Cart</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item submenu dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                          aria-expanded="false">Blog</a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <a className="nav-link" href="blog.html">Blog</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="single-blog.html">Blog Details</a>
                          </li>
                        </ul>
                      </li>
                      {/* <!-- 
                      <li className="nav-item submenu dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                          aria-expanded="false">Pages</a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <a className="nav-link" href="tracking.html">Tracking</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="elements.html">Elements</a>
                          </li>
                        </ul>
                      </li> --> */}
                      <li className="nav-item">
                        <a className="nav-link" href="contact.html">Contact</a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/auth/login'}>Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/auth/Register'}>Register</Link>
                      </li>
                    </ul>
                  </div>
    
                  <div className="col-lg-5 pr-0">
                    <ul className="nav navbar-nav navbar-right right_nav pull-right">
                      <li className="nav-item">
                        <a href="#" className="icons">
                          <i className="ti-search" aria-hidden="true"></i>
                        </a>
                      </li>
    
                      <li className="nav-item">
                        <Link  to={'Cart'} className="icons">
                          <i className="ti-shopping-cart">
                          <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>
                          </i>
                        </Link>
                      </li>
    
                      <li className="nav-item">
                        <a href="#" className="icons">
                      
                            

                          <li className="nav-item submenu dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                          aria-expanded="false">
                          <i className="ti-user" aria-hidden="true"> </i>
                          </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link className="nav-link" to={'Profile'}>Welcome { loading?"Loading..." : user.userName}</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={logout}>Logout</Link>
                          </li>
                        </ul>
                      </li>
                        



                         
                        </a>
                      </li>
    
                      <li className="nav-item">
                        <a href="#" className="icons">
                          <i className="ti-heart" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
  )
}
