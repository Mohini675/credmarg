import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminContext from '../context/AdminContext';

function CustomNavbar() {
  const adminContext = useContext(AdminContext);
  const redirect = useNavigate();

  const doLogout = () => {
    adminContext.logout();
    redirect("/");
  };

  const logoTextStyle = {
    fontSize: '1.5rem', 
    fontWeight: 'bold', 
    fontFamily: "Baskervville",
    color: "#008040",
  };

  const logoImageStyle = {
    width: 30,
    height: 30,
  };
  const navLinkStyle = {
    fontWeight: 'bold',
  };

  return (
    <Navbar className='bg-navbar-color' collapseOnSelect expand="lg" bg="light" variant="black">
      <Container>
        <Navbar.Brand as={NavLink} to="/" varient="green">
          <img style={logoImageStyle} alt='logo' src ="/assests/logo.png" />
          <span style={logoTextStyle}>&nbsp; <b>CredMarg</b></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/about" style={navLinkStyle}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" style={navLinkStyle}>Contact Us</Nav.Link>
          </Nav>

          <Nav>
            {
              adminContext.isLogin ?
                <>
                  <Nav.Link as={NavLink} to="/dashboard" style={navLinkStyle}>Dashboard</Nav.Link>
                  <Nav.Link as={NavLink} to="/" style={navLinkStyle}>{adminContext.adminData.email}</Nav.Link>
                  <Nav.Link onClick={doLogout} style={navLinkStyle}>Logout</Nav.Link>
                </>
                : (
                  <>
                    <Nav.Link as={NavLink} to="/login" style={navLinkStyle}>Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/register" style={navLinkStyle}>Signup</Nav.Link>
                  </>
                )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
