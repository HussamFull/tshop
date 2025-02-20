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


export default function SubCode() {
 const [isLoding, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const sendCode = async (value) => {
    setIsLoading(true);
    try {
   
      console.log(value)
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/auth/forgotPassword`,
        {...value }
      );

      if (response.status == 200) {
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
      
      console.log(error);
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
      const errorMessage = error.response?.data?.message || "Something went wrong!";
        setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          {/* العمود الخاص بالصورة */}
          <Col md={6} className="d-none d-md-block p-0">
            <Image
              src="/assets/img/r1.png"
              thumbnail
              alt="Login"
              className="w-100 vh-50"
            />
          </Col>
          <Col md={6} lg={6} className="vh-100">
            {/* Header Section */}
            <div className="text-center mb-4">
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
                Welcome to 
                <h3 className="syria-shop">
                  <span className="syria">Syria </span>
                  <span className="shop">Shop</span>
                </h3>
              </h2>

              <h4 className="text-center text-muted mb-4">Sub Code </h4>

              {serverError && (
                <div className="alert alert-danger">{serverError}</div>
              )}

              <Form onSubmit={handleSubmit(sendCode)}>
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

                <FloatingLabel
                  controlId="floatingPassword"
                  label="password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="password"
                    {...register("password", { required: "Password required" })}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password.message}</div>
                  )}
                </FloatingLabel>

                {/* Code  Field */}
                <FloatingLabel controlId="code" label="Code" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("code", {
                      // required: "Email is required",
                      //  pattern: {
                      //  value: /^\S+@\S+$/i,
                      //  message: "Invalid email format"
                      // }
                    })}
                  />
                </FloatingLabel>

                {/* Submit Button */}
                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    //disabled={isLoding}
                    size="lg"
                  >
                    {isLoding ? "Sub Code..." : "Sub Code"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
