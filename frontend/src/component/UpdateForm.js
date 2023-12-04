import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = ({ token, onUpdate }) => {
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8890/api/v1/emp/employees/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setEmployeeDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching employee details for update:', error);
      }
    };

    fetchEmployeeDetails();
  }, [token, id]);

  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      if (id) {
        console.log(employeeDetails);
        console.log(`http://localhost:8890/api/v1/emp/employees/${id}`);
        await axios.put(`http://localhost:8890/api/v1/emp/employees/${id}`, employeeDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error('Error updating employee details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  if (!token) {
    return <p>Please log in to update employee details.</p>;
  }
  if (!id) {
    return <p>No employee ID provided.</p>; // or redirect, or handle differently
  }

  return (
    <div>
      <h2>Update Employee Details</h2>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={employeeDetails.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={employeeDetails.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={employeeDetails.email}
          onChange={handleChange}
        />
      </label>

      <button className='btn btn-primary' style={{marginLeft:"2%"}} onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateForm;
