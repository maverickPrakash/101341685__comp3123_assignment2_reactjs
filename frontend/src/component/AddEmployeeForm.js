// AddEmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployeeForm = ({ token, onAddEmployee }) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        // If user is not logged in, navigate to login page
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:8890/api/v1/emp/employees',
        employeeDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newEmployee = response.data;

      setEmployeeDetails({
        first_name: '',
        last_name: '',
        email: '',
      });

      // Redirect to the dashboard after adding the employee
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleAddEmployee}>
      <h2>Add Employee</h2>
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

      <button className='btn btn-primary' style={{marginLeft:"2%"}}  type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
