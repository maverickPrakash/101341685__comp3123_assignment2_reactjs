// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import UpdateForm from './component/UpdateForm'; 
import Dashboard from './component/Dashboard';
import AddEmployeeForm from './component/AddEmployeeForm'; 
import EmployeeDetails from './component/EmployeeDetails';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const handleSignup = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <nav>
          {token ? (
            <>
              <ul>
                <li>
                  <Link to="/dashboard">Employee details display</Link>
                </li>
                <li>
                  <Link  className="btn btn-success" to="/dashboard/add-employee">Add Employee</Link>
                </li>
              </ul>
              <button style={{ position:'absolute',top:'2%',right:'2%'}} className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div style={{background:'greay'}}>
            <ul >
               <li>
                  <Link  to="/dashboard">Employee details display</Link>
                </li>
              <li style={{float:'right', paddingLeft:'4%'}}>
                <Link className='btn btn-primary' to="/login">Login</Link>
              </li>
              <li style={{float:'right'}}>
                <Link className='btn btn-primary' to="/signup">Signup</Link>
              </li>
            </ul>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route
            path="/dashboard"
            element={<Dashboard token={token} onLogout={handleLogout} />}
          />
          {/* Add a route for updating employees */}
          <Route
            path="/dashboard/update/:id"
            element={<UpdateForm token={token} onUpdate={Dashboard.handleUpdateSuccess} />}
          />
          {/* Add a route for adding an employee */}
          <Route
            path="/dashboard/add-employee"
            element={<AddEmployeeForm token={token} onAddEmployee={Dashboard.handleAddEmployee} />}
          />
          <Route
            path="/dashboard/view/:id"
            element={<EmployeeDetails />}
          />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
