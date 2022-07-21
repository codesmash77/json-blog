import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import Blogs from '../components/Blogs';
import { excerpt } from '../utility/excerpt';
import Search from '../components/Search';



const Home = () => {
  const [data,setData] = useState([]);
  const [search,setSearch] = useState("");


  useEffect(() => {
    loadBlogs();
  }, [])

  const loadBlogs = async () => {
      const response = await axios.get("http://localhost:5000/blogs");
      if(response.status === 200)
        setData(response.data)
      else toast.error("Couldnt get Blogs thru axios!")
  }

  const handleDelete = async (id) =>{
    if(window.confirm("Are u sure that u want to delete this blog?")){
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if(response.status === 200){
        toast.success("Blog Deleted Successfully")
        loadBlogs();
      }
      else toast.error("Couldnt find Blog to delete thru axios!") 
    }
  }
  
  const handleSearch = async (e) =>{
      e.preventDefault();
      const response = await axios.get(`http://localhost:5000/blogs?q=${search}`);
      if(response.status === 200){
        setData(response.data)
      }
      else toast.error("Couldnt search for the Blogs thru axios!") 
    
  }

  const onInputChange = (e) => {
    if(!e.target.value)
      loadBlogs();
    setSearch(e.target.value);
  }

  return (
    <>
      <Search search={search} onInputChange={onInputChange} handleSearch={handleSearch} />
      <MDBRow style={{marginTop: "20px"}}>
        {data.length ===0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item,index) =>
                <Blogs
                  key={index} 
                  {...item}
                  excerpt = {excerpt}
                  handleDelete = {handleDelete}
                />
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default Home