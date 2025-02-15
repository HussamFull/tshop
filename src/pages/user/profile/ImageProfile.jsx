import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../../components/user/context/UserContext';
import Loading from '../../../components/user/loading/Loading';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from'react-hook-form';
import { Bounce, toast, Flip } from'react-toastify';
import axios from 'axios';
import { useNavigate } from'react-router-dom';
import { useState } from 'react';


export default function ImageProfile() {
    const [ imagePreview, setImagePreview ] = useState(null);
    const {register, handleSubmit, formState : {errors} } = useForm();
    const {user , loading, setLoading } = useContext(UserContext);
    const token  = localStorage.getItem('userToken');
    const navigate = useNavigate();

    const updateImage = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        setLoading(true);
        try {
            // validation
          
            // update user image
            const response = await  axios.put(`${import.meta.env.VITE_BURL}/user/update-image` , formData,
                {headers: 
                    {
                    'Authorization': `Tariq__${token}`
                } })
            
                if(response.status == 200) {
                    toast.success("The image has been successfully  !", {
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
                      navigate("/profile/imageProfile");
                    
                }
            console.log(response.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
 
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) { // Check if a file is selected
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null); // Clear preview if no file selected
        }
    };
       
    
    
       

    return (
      <>
      

      <h1>ImageProfile</h1>
      {imagePreview ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}> {/* حاوية مرنة للتوسيط */}
        <img src={imagePreview} alt="Preview" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
    </div>
) : (
    <div style={{ display: 'flex', justifyContent: 'center' }}> {/* حاوية مرنة للتوسيط */}
        <img src={user.image.secure_url} alt="Preview" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
    </div>
)}
                             <br />
      
       <br />

      
      

      <Form onSubmit={handleSubmit(updateImage)}  encType='multipart/form-data' >
      <Form.Group className="mb-5" controlId="updateImage">
        <Form.Label>update Image Profile</Form.Label>
        <Form.Control type="file" {...register('image') } onChange={handleImageChange} placeholder="Image Profile" />

        <Form.Text className="text-muted">
            Image must be in jpg/png format and less than 2MB.
        </Form.Text>

        {loading && <div> <Loading /> </div>}

        {errors.image && <div className="text-danger">{errors.image.message}</div>}
      


        <Button variant="primary" type="submit">
        update
      </Button>


      </Form.Group>
     
      </Form>


      
  
      
  
    
     
  
  
  
      
      </>
    )
  }
  