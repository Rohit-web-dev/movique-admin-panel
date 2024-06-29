import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../store/appwrite/config';
import { login } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const session = await appwriteService.login(formData);
      if (session) {
        console.log('Logged in:', session);
        dispatch(login({ userData: session }));
        navigate('/');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="list-heading text-center mb-3">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-lists w-100 mt-3">
            Login
          </button>
        </form>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
