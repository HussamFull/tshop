import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, Flip } from 'react-toastify';







export default function Login() {


  const [isLoding, setIsLoding] = useState(false);



  const [serverError, setServerError] = useState("");


  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const loginUser = async (value) => {
    setIsLoding(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, value);
      if (response.status == 200) {
        toast.success('Welcome to Tshop !', {
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
        navigate('/');
      }
      console.log(response);
    } catch (error) {

      if (error.response.status == 409) {
        toast.error('Email already in use!', {
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
        toast.error('Something went wrong!', {
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
  }


  return (
    <>
      <Container>
        <Row>

          <h1>Login</h1>
          <Col md={{ span: 8, offset: 3 }}>



            {serverError ? <h4 className="text-danger" >{serverError} </h4> : null}


            <Form className="  mt-3" onSubmit={handleSubmit(loginUser)}>



           

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
                {isLoding ? 'Loading...' : 'Login'}
              </Button>


            </Form>


          </Col>
        </Row>
      </Container>

    </>
  )
}
