// Vendors.js
import React, { useContext, useEffect, useState } from "react";
import { addVendor, allVendors } from "../services/admin.service";
import AdminContext from "../context/AdminContext";
import { toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddVendorModal from "../components/AddVendorModal";


function Vendors() {
  const adminContext = useContext(AdminContext);
  const id = adminContext.adminData.id;

  const [vendorData, setVendorData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    upi: ''
  });

  useEffect(() => {
    const id = adminContext.adminData.id;
    allVendors(id)
      .then((data) => {
        // success handler
        console.log(data);
        setVendorData(data);
        // toast.success(" !!");
      })
      .catch((error) => {
        // error handler
        console.log(error);
        // toast.error("Error while fetching the vendors");
      });
  }, [adminContext.adminData.id]);

  const handleAddVendor = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

     //clear data
     const clearData = () => {
      setNewVendor({
        name: '',
        email: '',
        upi: ''
      })
    }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };




  const handleSaveVendor = (event) => {
    // Add logic to save the new vendor
    console.log("New Vendor Data: ", newVendor);
    event.preventDefault();

        //validate client side 
        if (newVendor.name === undefined || newVendor.name.trim() === '') {
            toast.error("Name is required !!")
            return
        }

        if (newVendor.email === undefined || newVendor.email.trim() === '') {
            toast.error("Email is required !!")
            return
        }

        if (newVendor.upi === undefined || newVendor.upi.trim() === '') {
            toast.error("Upi is required !!")
            return
        }

       
        //all right:
        //call api
        setLoading(true)
        addVendor(id,newVendor)
            .then(data => {
                //success handler
                console.log(data)
                toast.success("Vendor created successfully !!");
                clearData()

            })
            .catch(error => {
                //error handler
                console.log(error)
                toast.error("Invalid Data ! Try again")
            })
            .finally(() => {
              setLoading(false)
          })
          
    handleCloseModal();
    setVendorData([...vendorData, newVendor]);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>All Vendors</h2>
          <Button style={{ backgroundColor: '#1abc9c', borderColor: '#1abc9c' }} onClick={handleAddVendor}>
            Add Vendor
          </Button>
        </div>
        {vendorData.length !== 0 ? (
          <div className="row">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th width="170">#</th>
                  <th width="170">Name</th>
                  <th width="170">Email</th>
                  <th width="170">Upi</th>
                </tr>
              </thead>
              <tbody>
                {vendorData.map((data, index) => (
                  <tr key={index}>
                    <td width="170">{index + 1}</td>
                    <td width="170">{data.name}</td>
                    <td width="170">{data.email}</td>
                    <td width="170">{data.upi}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3>
            <i className="fa-regular fa-face-frown-open"></i> No Vendors !!
            <button
              className="btn"
              style={{ fontSize: "26px", marginBottom: "10px" }}
            >
              Add it First
            </button>
          </h3>
        )}
      </div>

      <AddVendorModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveVendor}
        handleInputChange={handleInputChange}
        newVendor={newVendor}
        loading={loading}
      />
    </div>
  );
}

export default Vendors;
