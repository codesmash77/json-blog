import React, { useState, useEffect } from 'react';
import { MDBValidation, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import  { getdate }  from '../utility/getdate';

const initialState ={
  title: "",
  author: "",
  description: "",
  category: "",
  imgUrl: "",
}

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech", "Literature", "Random"];

const AddBlog = () => {
  const [formValue,setFormValue] = useState(initialState);
  const [categoryErr,setCategoryErr] = useState(null);
  const [edit,setEdit] = useState(false);
  const { title, author, description, category, imgUrl} = formValue;
  const navigate = useNavigate();
  const {id} = useParams();
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env

  useEffect(() => {
    
      if(id){
        setEdit(true);
        getSingleBlog(id);
      }
      else {
        setEdit(false);
        setFormValue({ ...initialState })
      }
    
  }, [id])

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`);
    if( singleBlog.status === 200)
      setFormValue({ ...singleBlog.data });
    else toast.error("Couldn't Edit Blog! Somethign went wrong!");
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(!category || category === 'Please Select Category'){
        setCategoryErr(true);
      }
      if(title && description && author && !categoryErr){
        const currentDate = getdate();
        if(!edit){
            const updatedBlog = { ...formValue, date: currentDate};
            const response = await axios.post(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, updatedBlog);
            if(response.status === 201)
              toast.success("Blog Created Successfully!");
            else 
              toast.error("Something Went Wrong!");
        } else {
            const response = await axios.put(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`, formValue);
            if(response.status === 200)
              toast.success("Blog Updated Successfully!");
            else 
              toast.error("Something Went Wrong!");
        }
        setFormValue({ ...initialState });
        navigate("/");
      }
  }

  const onInputChange = (e) =>{
      let { name, value } = e.target;
      setFormValue({...formValue, [name]: value});
  }  
  
  const onCategoryChange = (e) =>{
      setCategoryErr(false);
      setFormValue({...formValue, category: e.target.value});
  }
  
  return (
    <>
      <MDBValidation className='row g-3' style={{marginTop: "100px"}} noValidate onSubmit={handleSubmit}>
        <p className='fs-2 fw-bold'>
          {edit ? "Update Blog" : "Add Blog" }
        </p>
        <div 
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}>
            <MDBInput
              value={title || ""}
              name="title"
              type="text"
              onChange={onInputChange}
              required
              label="Title"
              feedback="Please provide a title"
              invalid
            />
            <br/>

            <MDBInput
              value={author || ""}
              name="author"
              type="text"
              onChange={onInputChange}
              required
              label="Author"
              validation="Please provide an author"
              invalid
            />
            <br/>

            <MDBInput
              value={description || ""}
              name="description"
              type="text"
              onChange={onInputChange}
              required
              label="Description"
              validation="Please provide a description"
              textarea
              rows={4}
              invalid
            />
            <br/>

            <MDBInput
              value={imgUrl || ""}
              name="imgUrl"
              type="text"
              onChange={onInputChange}
              label="Image Url"
              textarea
              rows={10}
              validation
              invalid
            />
            <br/>

            <select className='categoryDropdown' onChange={onCategoryChange} value={category} 
            style={categoryErr?{borderColor: 'red'}:{borderColor: 'green'}}>
              <option>Please Select Category</option>
              {options.map((option,index) => 
                <option value={option || ""} key={index}>{option}</option>
              )}
            </select>
            <br/>
            <br/>
            <MDBBtn type='submit' style={{marginRight: "10px"}}>
              { edit? "Update" : "Add" }
            </MDBBtn>
            <MDBBtn color='danger' style={{marginRight: "10px"}} onClick={()=>navigate('/')}>
              Go Back
            </MDBBtn>
        </div>
      </MDBValidation>
    </>
  )
}

export default AddBlog