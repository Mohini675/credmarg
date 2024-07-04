// Employee.js
import React, { useContext, useEffect, useState } from "react";
import { addEmployee, allEmployees } from "../services/admin.service";
import AdminContext from "../context/AdminContext";
import { toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddEmployeeModal from "../components/AddEmployeeModal";
import { Spinner } from "react-bootstrap";


function Employee() {
  const adminContext = useContext(AdminContext);
  const id = adminContext.adminData.id;

  const [employeeData, setEmployeeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    designation: '',
    ctc: ''
  });

  useEffect(() => {
    
    allEmployees(id)
      .then((data) => {
        // success handler
        console.log(data);
        setEmployeeData(data);
        // toast.success(" !!");
      })
      .catch((error) => {
        // error handler
        console.log(error);
        // toast.error("Error while fetching the employee");
      });
  }, []);

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    //clear data
    const clearData = () => {
      setNewEmployee({
        name: '',
        email: '',
        designation: '',
        ctc: ''
      })
    }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };


  const handleSaveEmployee = (event) => {
    // Add logic to save the new employee
    console.log("New Employee Data: ", newEmployee);
    event.preventDefault();

        //validate client side 
        if (newEmployee.name === undefined || newEmployee.name.trim() === '') {
            toast.error("Name is required !!")
            return
        }

        if (newEmployee.email === undefined || newEmployee.email.trim() === '') {
            toast.error("Email is required !!")
            return
        }

        if (newEmployee.designation === undefined || newEmployee.designation.trim() === '') {
            toast.error("Designation is required !!")
            return
        }

        if (newEmployee.ctc === undefined || newEmployee.ctc.trim() === '') {
            toast.error("CTC is required !!")
            return
        }
        //all right:
        //call api
        setLoading(true)
        addEmployee(id,newEmployee)
            .then(data => {
                //success handler
                console.log(data)
                toast.success("Employee created successfully !!");
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
    setEmployeeData([...employeeData, newEmployee]);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Employees</h2>
           <Button
            style={{ backgroundColor: '#1abc9c', borderColor: '#1abc9c' }}
            onClick={handleAddEmployee}
          >
            Add Employee
          </Button> 
      


        </div>
        {employeeData.length !== 0 ? (
          <div className="row">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th width="170">#</th>
                  <th width="170">Name</th>
                  <th width="170">Email</th>
                  <th width="170">Designation</th>
                  <th width="170">Ctc</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((data, index) => (
                  <tr key={index}>
                    <td width="170">{index + 1}</td>
                    <td width="170">{data.name}</td>
                    <td width="170">{data.email}</td>
                    <td width="170">{data.designation}</td>
                    <td width="170">{data.ctc}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3>
            <i className="fa-regular fa-face-frown-open"></i> No Employees !!
            <button
              className="btn"
              style={{ fontSize: "26px", marginBottom: "10px" }}
            >
              Add it First 
            </button>
          </h3>
        )}
      </div>

      <AddEmployeeModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveEmployee}
        employee={newEmployee}
        handleChange={handleInputChange}
        loading={loading}
      />
    </div>
  );
}

export default Employee;
