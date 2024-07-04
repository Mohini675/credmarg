import React from 'react'
import Base from '../components/Base'
import { Button, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ImgItem from '../components/ImgItem'
import Footer from '../components/Footer'


function Home() {

  const h1Style = {
    fontSize: '2.5rem', // Adjust the size as needed
    fontWeight: 'bold', // Optional: Set the font weight
    //color: '#333', 
    fontFamily:"Poppins",
    color:"#008040",
    paddingLeft:"5",
    margin:"2rem",
   
    // Optional: Set the font color
  };
  const h2Style = {
    fontSize: '1.5rem', // Adjust the size as needed
    fontWeight: 'bold', // Optional: Set the font weight
    //color: '#333', 
    fontFamily:"Poppins",
    color:"#FF8096",
    paddingLeft: '5',
    marginLeft:"1.5rem"
    
   
    // Optional: Set the font color
  };
  return (
    <div>

<div>
        <ImgItem
          backImg="https://plus.unsplash.com/premium_photo-1666739387925-5841368970a7?q=80&w=1353&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          backTitle="Home"
          cname="display-4 text-uppercase fw-bold"
        />
      </div>
      <Container>
        <h1 style={h1Style}>Welcome to Cred Marg..</h1>
        <h3 style={h2Style}>Start your journey with us</h3>
      </Container>
   <Footer/>
    </div>
  )
}

export default Home