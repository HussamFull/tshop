import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, Flip } from "react-toastify";
import { Badge } from "react-bootstrap";
import CustomNavbar from "../../../components/user/navbar/Navbar";
import { Link } from "react-router-dom";

export default function Register() {
  const [isLoding, setIsLoding] = useState(false);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const registerUser = async (value) => {
    setIsLoding(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/signup`,
        value
      );
      if (response.status == 201) {
        toast.success("Please check your Email!", {
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
        navigate("/auth/login");
      }
      console.log(response);
    } catch (error) {
      if (error.response.status == 409) {
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
      setIsLoding(false);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container fluid >
        <Row >
          {/* العمود الخاص بالصورة */}
          <Col md={6} className="d-none d-md-block p-4">
            <Image
              src="/assets/img/r1.png"
              thumbnail
              alt="Login"
              className="w-100 vh-100"
            />
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
          <div className="w-75">
            {/* Header Section */}
            <div className="text-center mb-4 ">
              <h1 className="syria-shop">
                <span className="syria">Syria </span>
                <span className="shop">Shop</span>
              </h1>
              {/* <h1 className="display-4">Syria Shop</h1>  */}
              <p className="text-muted mt-3">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary">
                  SIGN IN
                </Link>
              </p>
            </div>    

            {/* Main Content */}
            <div className="border p-4 rounded-3 shadow-sm">
              <h2 className="text-center mb-3">
                Welcome to{" "}
                <h3 className="syria-shop">
                  <span className="syria">Syria </span>
                  <span className="shop">Shop</span>
                </h3>
              </h2>

              <h4 className="text-center text-muted mb-4">
                Register your account
              </h4>

              {serverError && (
                <div className="alert alert-danger">{serverError}</div>
              )}

              <Form onSubmit={handleSubmit(registerUser)}>
                {/* Name Field */}
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    {...register("userName", {
                      required: "Name is required",
                    })}
                  />
                  {errors.userName && (
                    <div className="text-danger small mt-1">
                      {errors.userName.message}
                    </div>
                  )}
                </FloatingLabel>

                {/* Email Field */}
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="focus001@gmail.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-danger small mt-1">
                      {errors.email.message}
                    </div>
                  )}
                </FloatingLabel>

                {/* Password Field */}
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger small mt-1">
                      {errors.password.message}
                    </div>
                  )}
                  <Form.Text className="text-muted">8+ characters</Form.Text>
                </FloatingLabel>

                {/* Submit Button */}
                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoding}
                    size="lg"
                  >
                    {isLoding ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>

                {/* Social Login Section */}
                {/* <div className="text-center mt-4">
              <p className="text-muted">Create account with</p>
              <div className="d-flex gap-3 justify-content-center">
                <Button 
                  variant="outline-dark" 
                  className="d-flex align-items-center gap-2"
                >
                  <i className="fab fa-google"></i>
                  Google
                </Button>
                <Button 
                  variant="outline-dark" 
                  className="d-flex align-items-center gap-2"
                >
                  <i className="fab fa-apple"></i>
                  Apple
                </Button>
              </div>
            </div> */}
              </Form>
            </div>
          </div>
          </Col>
        </Row>

        {/*  
        <Row>

          <h1>Register</h1>
          <Col md={{ span: 8, offset: 3 }}>



            {serverError ? <h4 className="text-danger" >{serverError} </h4> : null}


            <Form className="  mt-3" onSubmit={handleSubmit(registerUser)}>



              <FloatingLabel
                controlId="floatingInput"
                label="User name"
                className="mb-4"
              >
                <Form.Control type="text" placeholder="User Name" {...register("userName", { required: "username is required" })} />

                {errors.userName ? <h3 className="text-danger" >{errors.userName.message} </h3> : null}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email Address "
                className="mb-4"
              >
                <Form.Control type="email" placeholder="name@example.com" {...register("email", { required: "username is email" })} />
                {errors.email ? <div className="text-danger" >{errors.email.message} </div> : null}
              </FloatingLabel>



              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
              >
                <Form.Control type="password" placeholder="Password"  {...register("password", { required: "username is password" })} />
                {errors.password ? <div className="text-danger" >{errors.password.message} </div> : null}
              </FloatingLabel>

              <Button type='submit' className="mt-4" variant="primary"
                disabled={isLoding}>
                {isLoding ? 'Loading...' : 'Register'}
              </Button>


            </Form>


          </Col>
        </Row>*/}
      </Container>
    </>
  );
}
