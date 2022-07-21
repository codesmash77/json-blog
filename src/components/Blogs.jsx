import React from 'react';
import { MDBCard, MDBCol, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Badge from './Badge';

const Blogs = ({title, author, description, category, id, imgUrl, excerpt, handleDelete}) => {
  return (
    <>
      <MDBCol size="4">
        <MDBCard className='h-100 mt-2' style={{maxWidth: "22rem"}}>
          <MDBCardImage
            src={imgUrl ? imgUrl : "https://www.volusion.com/blog/content/images/2019/04/Blog.jpg"}
            alt="Blog Image"
            position='top'
            style={{maxWidth: "100%" , height: "180px"}}
          />
          <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>{excerpt(description)}</MDBCardText>
            <Link to={`/blog/${id}`}>Read More</Link>
            <Badge>{author}</Badge>
            <Badge>{category}</Badge>
            <span>
              <MDBBtn className='mt-1' tag="a" colog="none" onClick={()=>handleDelete(id)}>
                <MDBIcon 
                  fas
                  icon='trash'
                  size="lg"
                />
              </MDBBtn>
              <Link to={`/editBlog/${id}`}>
                <MDBIcon 
                  fas
                  icon='edit'
                  style={{marginLeft:"15px"}}
                  size="2x"
                />
              </Link>
            </span>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  )
}

export default Blogs