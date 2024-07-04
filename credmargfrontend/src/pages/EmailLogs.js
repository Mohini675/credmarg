// EmailLogs.js
import React, { useContext, useEffect, useState } from "react";
import { emailLogs, sendEmails } from "../services/admin.service"; 
import AdminContext from "../context/AdminContext";
import { toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SendEmailModal from "../components/SendEmailModal";


function EmailLogs() {
  const adminContext = useContext(AdminContext);

  const [emailData, setEmailData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const id = adminContext.adminData.id;
    emailLogs(id)
      .then((data) => {
        // success handler
        console.log(data);
        setEmailData(data);
        // toast.success(" !!");
      })
      .catch((error) => {
        // error handler
        console.log(error);
        // toast.error("Error while fetching the email logs");
      });
  }, [adminContext.adminData.id]);

  const handleSendEmail = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSend = (emailTemplate) => {
    // Add logic to send the email using emailTemplate
    console.log("Sending email with template: ", emailTemplate);
    sendEmails(adminContext.adminData.id, emailTemplate)
    .then((response) => {
      // Handle success
      toast.success("Email sent successfully");
    })
    .catch((error) => {
      // Handle error
      toast.error("Error sending email");
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Email Logs</h2>
          <Button style={{ backgroundColor: '#1abc9c', borderColor: '#1abc9c' }} onClick={handleSendEmail}>
            Send Email
          </Button>
        </div>
        {emailData.length !== 0 ? (
          <div className="row">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th width="170">#</th>
                  <th width="170">Recipient</th>
                  <th width="170">Message</th>
                  <th width="170">Time</th>
                </tr>
              </thead>
              <tbody>
                {emailData.map((data, index) => (
                  <tr key={index}>
                    <td width="170">{index + 1}</td>
                    <td width="170">{data.recipient}</td>
                    <td width="170">{data.message}</td>
                    <td width="170">{data.sentAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3>
            <i className="fa-regular fa-face-frown-open"></i> No Emails !!
            <button
              className="btn"
              style={{ fontSize: "26px", marginBottom: "10px" }}
            >
              Send Email First By Clicking on Send Email
            </button>
          </h3>
        )}
      </div>

      <SendEmailModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSend={handleSend}
      />
    </div>
  );
}

export default EmailLogs;
