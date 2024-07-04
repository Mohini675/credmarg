import React from 'react';
import { Container } from 'react-bootstrap';

const footerStyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  height:'50px',
  width: '100%',
  backgroundColor: '#34495e',  // Replace with your desired background color
  color: 'white',
  textAlign: 'center',
  padding: '10px',
};

function Footer() {
  return (
    <div style={footerStyle}>
      <Container>
        <p>All rights reserved</p>
      </Container>
    </div>
  );
}

export default Footer;
