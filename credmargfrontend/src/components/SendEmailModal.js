import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getVendor } from '../services/admin.service';
import AdminContext from '../context/AdminContext';
import { toast } from 'react-toastify';

function SendEmailModal({ show, handleClose, handleSend }) {
  const adminContext = useContext(AdminContext);
  const id = adminContext.adminData.id;
  
  const [emailTemplate, setEmailTemplate] = useState({message:'',vendor:{name:"",email:"",upi:""}});


  const clearData=()=>{
    setEmailTemplate({message:'',vendor:{name:"",email:"",upi:""}})
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmailTemplate(prevData => ({
      ...prevData,
      vendor: {
        ...prevData.vendor,
        [name]: value
      },
      [name]: name === 'message' ? value : prevData.message
    }));
  };

  const handleSendEmail = () => {
    getVendor(id, emailTemplate.vendor.email).then(data => {
      setEmailTemplate(prevData => ({
        ...prevData,
        vendor: {
          ...prevData.vendor,
          ...data
        }
      }));

      handleSend({
        ...emailTemplate,
        vendor: {
          ...emailTemplate.vendor,
          ...data
        }
      });
      handleClose();
      clearData();
    })
    .catch(error => {
      console.error(error);
      toast.error("Invalid Vender Add this vendor first!");
      
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Label>To </Form.Label>
          <Form.Group controlId="formTemplate">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={emailTemplate.vendor.email}
              onChange={handleChange}
            />
            <Form.Label>Email Template</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="message"
              placeholder="Enter your email template here..."
              value={emailTemplate.message}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendEmail} style={{ backgroundColor: '#1abc9c', borderColor: '#1abc9c' }}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SendEmailModal;
