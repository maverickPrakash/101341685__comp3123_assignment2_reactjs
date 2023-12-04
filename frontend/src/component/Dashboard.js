// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import UpdateForm from './UpdateForm';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeDetails from './EmployeeDetails';

const Dashboard = ({ token, onLogout }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  const handleAddEmployee = (newEmployee) => {
    setEmployeeData((prevData) => [...prevData, newEmployee]);
  };

  const fetchEmployeeData = async () => {
    try {
      if (token) {
        const response = await axios.get('http://localhost:8890/api/v1/emp/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployeeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [token, location.key]);

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8890/api/v1/emp/employees?eid=${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployeeData((prevData) => prevData.filter((employee) => employee._id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  const handleUpdateFormClose = () => {
    setSelectedEmployeeId(null);
  };

  const handleUpdateSuccess = () => {
    handleUpdateFormClose();
    fetchEmployeeData();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!token) {
    return (
      <div>
        <p>Please log in to view this content.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <button className='btn btn-success' onClick={() => setShowAddEmployeeForm(true)}>Add Employee</button>

      {showAddEmployeeForm && (
        <AddEmployeeForm token={token} onAddEmployee={handleAddEmployee} />
      )}

      <ul>
        {employeeData.map((employee) => (
          <li key={employee._id}>
            <p>Name: {`${employee.first_name} ${employee.last_name}`}</p>
            <p>Email: {employee.email}</p>
            <Link className='btn btn-info'
              to={`/dashboard/update/${employee._id}`}
              onClick={() => handleUpdateClick(employee._id)}
            >
              Update
            </Link>{' '}
            <button className='btn btn-danger' onClick={() => handleDelete(employee._id)}>Delete</button>
            <Link className='btn btn-primary' to={`/dashboard/view/${employee._id}`}>
              View Details
            </Link>
          </li>
        ))}
      </ul>

      {selectedEmployeeId && (
        <UpdateForm token={token} employeeId={selectedEmployeeId} onUpdate={handleUpdateSuccess} />
      )}

      <Routes>
      <Route
            path="/dashboard/view/:id"
            element={<EmployeeDetails token={token} />}
          />
      </Routes>
    </div>
  );
};

export default Dashboard;
