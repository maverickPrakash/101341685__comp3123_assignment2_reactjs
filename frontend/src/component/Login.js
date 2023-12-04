import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8890/api/v1/user/login', {
        username,
        password,
      });

      console.log('Login response:', response);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        onLogin(token);
        setLoginSuccess(true);
        navigate('/dashboard');
        window.location.reload()
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button className='btn btn-primary' style={{marginLeft:"2%"}}  onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      {loginSuccess && <p>Login successful! Redirecting...</p>}
    </div>
  );
};

export default Login;
