// AddVendorModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";

function AddVendorModal({ show, handleClose, handleSave ,newVendor, handleInputChange,loading }) {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={newVendor.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={newVendor.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formUpi">
            <Form.Label>UPI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UPI"
              name="upi"
              value={newVendor.upi}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleSave} style={{ backgroundColor: '#1abc9c', borderColor: '#1abc9c' }}>
          Save Changes
        </Button> */}
        <Button
          //style={{ backgroundColor: '#1abc9c', borderColor: '#1abc9c' }}
          onClick={handleSave}
          className="text-uppercase"
          variant="success"
          disabled={loading}
        >
          <Spinner
            animation="border"
            size="sm"
            className="me-2"
            hidden={!loading}
          />
          <span hidden={!loading}>Wait...</span>
          <span hidden={loading}>Save Changes</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddVendorModal;
