/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBContainer, MDBTypography, MDBCard, 
         MDBCardBody, MDBCardImage, MDBCardText, 
         MDBCardTitle, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Badge from '../components/Badge';
import { toast } from 'react-toastify';
import { excerpt } from '../utility/excerpt';

const Blog = () => {
  const [blog,setBlog] = useState();
  const [relatedBlogs,setRelatedBlogs] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    if(id){
        getSingleBlog(id);
    }
  }, [id])

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedBlogData = await axios.get(`http://localhost:5000/blogs?category=${singleBlog.data.category}&_start=0&_end=7`);
    if( singleBlog.status === 200 || relatedBlogData.status === 200){
      setBlog(singleBlog.data);
      setRelatedBlogs(relatedBlogData.data);
    }
    else toast.error("Couldn't Fetch Blog! Something went wrong!");
  }

  const styleInfo ={
      display: "inline",
      marginLeft: "5px",
      float: "right",
      marginTop: "10px"
  }

  return (
    <>
      <MDBContainer className='mb-4' style={{marginTop: "20px", background: "#EDE7F6", borderRadius:"15px"}}>
        <Link to='/'>
          <strong className='mt-4' style={{float:"left", color: "black", marginLeft:"10px"}}>
            Go Back
          </strong>
        </Link>
        <MDBTypography tag="h2" className='text mt-4' style={{display: "inline-block"}}>
          {blog && blog.title}
        </MDBTypography>
        <MDBContainer style={{marginTop: "10px"}}>
          <img src={ (blog && blog.imgUrl) ? blog.imgUrl : "https://www.volusion.com/blog/content/images/2019/04/Blog.jpg" } className="img-fluid rounded" 
            style={{display:"inline-flex", width:"50%", height: "50%", border: "2px solid", borderRadius:"10px"}}/>
        </MDBContainer>
        { blog && <MDBContainer style={{height:"43px",marginTop: "10px", background: "#FFF3E0"}}>
          <div>
            <MDBIcon
              style={{float: "left", marginLeft:"10px"}}
              className="mt-3"
              far
              icon="calendar-alt"
              size="lg"
            />
            <strong style={{float: "left", marginLeft:"5px", marginTop:"12px"}}>
              {blog && blog.date}
            </strong>
            <div style={{float: "right", marginRight:"15px", marginTop:"10px"}}>
              <Badge>{blog.category}</Badge>
            </div>
          </div>
          <div>
            <Badge>{blog.author}</Badge>
          </div>
        </MDBContainer>
        }
        <MDBTypography className='lead md-0'>
          {blog && blog.description}
        </MDBTypography>
        {relatedBlogs && relatedBlogs.length > 1 &&(
        <>
        <h1>Related Posts</h1>
        <MDBRow className='row-cols-1 row-cols-md-5 g-4'>
          {relatedBlogs.filter((item) => item.id != id).map((item,index) => (
            <MDBCol>
              <MDBCard className='h-90 mt-2 mb-4'>
                <Link to={`/blog/${item.id}`}>
                  <MDBCardImage src={item.imgUrl ? item.imgUrl : "https://www.volusion.com/blog/content/images/2019/04/Blog.jpg"}
                    alt={item.title}
                    position="top"
                  />
                </Link>
                <MDBCardBody>
                  <MDBCardTitle>
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText>
                    {excerpt(item.description)}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        </>
      )}
      </MDBContainer>
    </>
  )
}

export default Blog