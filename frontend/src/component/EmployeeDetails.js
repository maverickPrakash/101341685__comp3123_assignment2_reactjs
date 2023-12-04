// EmployeeDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = ({ token }) => {
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
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [token, id]);

  return (
    <div>
      <h2>Employee Details</h2>
      <p>
        <strong>First Name:</strong> {`${employeeDetails.first_name} `}
      </p>
      <p>
        <strong>Last Name:</strong> {`${employeeDetails.last_name} `}
      </p>
      <p>
        <strong>Email:</strong> {employeeDetails.email}
      </p>

      <Link className='btn btn-info' to={`/dashboard/update/${id}`}>
        Update
      </Link>
    </div>
  );
};

export default EmployeeDetails;
