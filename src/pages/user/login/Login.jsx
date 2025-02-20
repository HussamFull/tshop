import React, { useState } from "react";

import { Container, Row, Col , Card, FormCheck } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, Flip } from "react-toastify";
import CustomNavbar from "../../../components/user/navbar/Navbar";
import Image from 'react-bootstrap/Image';
//import Loading from '../../../components/user/loading/Loading'; 
import Loading from "../../../components/user/loading/Loading";






export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const loginUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/signin`,
        value
      );

      localStorage.setItem("userToken", response.data.token);
      

      navigate("/");

     
      console.log(response);
    } catch (error) {
      if ( error.response.status == 409) {
        toast.error("Email already in use!", {
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
      } else {
        toast.error("Something went wrong!", {
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
      }

      setServerError(error.response.data.message);

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar />

      <Container fluid>
      <Row>
        {/* العمود الخاص بالصورة */}
        <Col md={6} className="d-none d-md-block p-0">
          <Image src="/assets/img/login.jpg" thumbnail  alt="Login" className="w-100 vh-100" />
        </Col>

        {/* العمود الخاص بالنموذج */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h1 className="text-center mb-4">Login </h1>
            {serverError && (
              <h4 className="text-danger text-center">{serverError}</h4>
            )}
            <Form onSubmit={handleSubmit(loginUser)}>
              <FloatingLabel
                controlId="floatingInput"
                label=" Email Address "
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', { required: 'Email required' })}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.message}</div>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password required' })}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password.message}</div>
                )}
              </FloatingLabel>

              <Button
                type="submit"
                className="w-100 mb-3"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? <div> <Loading /> </div> : 'Login' }
              </Button>

              <div className="text-center">
                <Link to={'/auth/sendcode'}  className="text-decoration-none">
                Forgot your password?
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>


    




      {/* <Container>
        <Row>
          <h1>Login</h1>
          //Login Form 
           <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <Image  src="/assets/img/login.jpg" fluid />
          </div>
          </Col>
          <Col md={{ span: 8, offset: 3 }}>
            {serverError ? (
              <h4 className="text-danger">{serverError} </h4>
            ) : null}

            <Form className="  mt-3" onSubmit={handleSubmit(loginUser)}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email Address "
                className="mb-4"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "username is email" })}
                />
                {errors.email ? (
                  <div className="text-danger">{errors.email.message} </div>
                ) : null}
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "username is password",
                  })}
                />
                {errors.password ? (
                  <div className="text-danger">{errors.password.message} </div>
                ) : null}
              </FloatingLabel>

              <Button
                type="submit"
                className="mt-4"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </Form>
          </Col> 
        </Row>
      </Container> */}
    </>
    
  );
}
