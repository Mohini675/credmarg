import React, { useState } from 'react';
import "../assests/css/Dashboard.css"
import Employee from '../pages/Employee';
import { useContext } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom"
import AdminContext from '../context/AdminContext';
import Vendors from '../pages/Vendors';
import EmailLogs from '../pages/EmailLogs';
import Footer from './Footer';
import Base from './Base';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('employees');

  const adminContext = useContext(AdminContext);


  // not logged in  vew

const notLoggedInView = () => {
  return (
      <Container>
          <Row>
              <Col md={{
                  span: 8,
                  offset: 2
              }}>
                  <Card className="border-0 shadow mt-3">
                      <Card.Body className="text-center">

                          <h3>You are not logged In !!</h3>
                          <p>Please do login to view the page </p>
                          <Button as={NavLink} to="/login" variant="success" >Login Now</Button>

                      </Card.Body>
                  </Card>
              </Col>
          </Row>
      </Container>
  )
}

  const renderContent = () => {
    switch (activeSection) {
      case 'employees':
        return <div className="content-section"><Employee/></div>;
      case 'vendors':
        return <div className="content-section"><Vendors/></div>;
      case 'emails':
        return <div className="content-section"><EmailLogs/></div>;
      default:
        return null;
    }
  };

  //private dashboard view
const dashboardView = () => {
    return (
    <div>
      <Base title='Admin Dashboard'/>
        <div className="container-dashboard">
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => setActiveSection('employees')}>All Employees</li>
          <li onClick={() => setActiveSection('vendors')}>All Vendors</li>
          <li onClick={() => setActiveSection('emails')}>All Emails</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
    <Footer/>
    </div>

    )
}

  return (
    (adminContext.isLogin) ? dashboardView() : <Navigate to="/login" />
  );
}

export default Dashboard;



