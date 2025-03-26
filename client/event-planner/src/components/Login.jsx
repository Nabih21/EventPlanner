import { useState, useEffect } from 'react';

const Login = ({ switchToSignup, switchToAdminSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [formValid, setFormValid] = useState(false);

  // Validate form on every input change
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Check if form is valid to enable/disable submit button
  useEffect(() => {
    const isFormValid = 
      formData.email.trim() !== '' && 
      /\S+@\S+\.\S+/.test(formData.email) &&
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
    
    // Email validation
    if (touched.email) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email format is invalid';
      }
    }
    
    // Password validation
    if (touched.password) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password should be at least 6 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    setTouched({
      email: true,
      password: true
    });
    
    if (validateForm()) {
      try {
        // TODO: Add API call to backend for login
        console.log('Login form submitted:', formData);
        
        // Here you would typically:
        // 1. Send credentials to backend
        // 2. Receive and store authentication token
        // 3. Redirect to appropriate dashboard
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ 
          form: 'Login failed. Please check your credentials.'
        });
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className={getInputClassName('email')}
            required
          />
          {touched.email && errors.email ? (
            <div className="error-message">{errors.email}</div>
          ) : touched.email && formData.email ? (
            <div className="valid-message">Email is valid</div>
          ) : null}
        </div>
        
        <div className="form-field">
          <label htmlFor="password">Password</label>
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
          ) : touched.password && formData.password.length >= 6 ? (
            <div className="valid-message">Password is valid</div>
          ) : null}
        </div>
        
        <div className="form-field">
          <label htmlFor="role">Login as</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!formValid}
        >
          Login
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