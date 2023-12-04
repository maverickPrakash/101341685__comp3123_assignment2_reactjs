import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignup = async () => {
    try {

      setSignupSuccess(true);
      navigate('/login'); 
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='btn btn-primary' style={{marginLeft:"2%"}}  onClick={handleSignup}>Signup</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {signupSuccess && <p>Signup successful! Redirecting to login...</p>}
    </div>
  );
};

export default Signup;
