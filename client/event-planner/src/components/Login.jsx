import { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';

const Login = ({ switchToSignup, switchToAdminSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validate form on every input change
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Check if form is valid to enable/disable submit button
  useEffect(() => {
    const isFormValid = 
      formData.username.trim() !== '' && 
      formData.password.trim() !== '';
    
    setFormValid(isFormValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (touched.username && !formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    // Password validation
    if (touched.password && !formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    setTouched({
      username: true,
      password: true
    });
    
    if (validateForm()) {
      try {
        setLoading(true);
        setErrors({});
        
        // Use the authService to login
        const response = await authService.login(formData);
        
        if (response.message === 'InvalidUser') {
          setErrors({ form: 'User does not exist. Please check your username.' });
          return;
        }
        
        if (response.message === 'PasswordBad') {
          setErrors({ form: 'Incorrect password. Please try again.' });
          return;
        }
        
        if (response.token && response.userID) {
          // Save auth token and user ID to localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userID', response.userID);
          
          // Redirect to Events page
          window.location.href = '/events';
        } else {
          setErrors({ form: 'Login failed. Please try again.' });
        }
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ 
          form: 'Login failed. Please check your credentials or try again later.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getInputClassName = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? 'error' : '';
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {errors.form && <div className="error-message">{errors.form}</div>}
        
        <div className="form-field">
          <label htmlFor="username">
            <FaUser className="input-icon" /> Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
            className={getInputClassName('username')}
            required
          />
          {touched.username && errors.username ? (
            <div className="error-message">{errors.username}</div>
          ) : touched.username && formData.username ? (
            <div className="valid-message">Username is valid</div>
          ) : null}
        </div>
        
        <div className="form-field">
          <label htmlFor="password">
            <FaLock className="input-icon" /> Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            className={getInputClassName('password')}
            required
          />
          {touched.password && errors.password ? (
            <div className="error-message">{errors.password}</div>
          ) : touched.password && formData.password ? (
            <div className="valid-message">Password is valid</div>
          ) : null}
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!formValid || loading}
        >
          {loading ? (
            <>
              <FaSpinner className="spinner-icon" /> Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
      
      <div className="auth-links">
        <button 
          onClick={switchToSignup} 
          className="link-button"
        >
          Don't have an account? Sign Up
        </button>
        <button 
          onClick={switchToAdminSignup} 
          className="link-button"
        >
          Admin Registration
        </button>
      </div>
    </div>
  );
};

export default Login;