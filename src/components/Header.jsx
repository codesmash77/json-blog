import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';



const Header = () => {
    const [show,setShow] = useState(false);
  return (
    <>
        <MDBNavbar expand='lg' dark style={{ backgroundColor: '#cfffff' }}>
        <MDBContainer fluid>
            <MDBNavbarBrand href='/'>
                <img src="https://thumbs.dreamstime.com/b/blog-icon-dark-background-simple-vector-116865750.jpg" 
                 alt="BLOGiT" style={{ height: "60px" }} />
            </MDBNavbarBrand>
            <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            style={{color: '#000f21' }}
            onClick={() => setShow(!show)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/' style={{color: '#000000'}}>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href='/addBlog' style={{color: '#000000'}}>AddBlog</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href='/contact' style={{color: '#000000'}}>Contact</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href='/about' style={{color: '#000000'}}>About</MDBNavbarLink>
                </MDBNavbarItem>
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>
    </>
  )
}

export default Header