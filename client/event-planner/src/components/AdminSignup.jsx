import { useState, useEffect } from 'react';

const AdminSignup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accessCode: '' // For restricted access verification
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    accessCode: false
  });
  const [formValid, setFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Validate form on input change
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength('');
      return;
    }
    
    // Admin password strength calculation (higher standards than regular users)
    const hasLength = formData.password.length >= 8;
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    
    const strengthScore = [hasLength, hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    
    if (strengthScore <= 2) {
      setPasswordStrength('weak');
    } else if (strengthScore === 3) {
      setPasswordStrength('fair');
    } else if (strengthScore === 4) {
      setPasswordStrength('good');
    } else {
      setPasswordStrength('strong');
    }
  }, [formData.password]);

  // Check if all required fields are valid
  useEffect(() => {
    const isFormValid = 
      formData.name.trim() !== '' && 
      /\S+@\S+\.\S+/.test(formData.email) && 
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword &&
      formData.accessCode.trim() !== '';
    
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
    
    // Name validation
    if (touched.name && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (touched.email) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email format is invalid';
      }
    }
    
    // Password validation with higher standards for admin
    if (touched.password) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Admin password must be at least 8 characters';
      } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character';
      }
    }
    
    // Confirm password validation
    if (touched.confirmPassword) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    // Access code validation
    if (touched.accessCode && !formData.accessCode) {
      newErrors.accessCode = 'Access code is required for admin registration';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      accessCode: true
    });
    
    if (validateForm()) {
      try {
        // TODO: Add API call to backend for admin signup
        console.log('Admin signup form submitted:', formData);
        
        // Here you would typically:
        // 1. Send admin data to backend with access code verification
        // 2. Handle the response
        // 3. Redirect to login or admin dashboard
      } catch (error) {
        console.error('Admin registration failed:', error);
        setErrors({ 
          form: 'Admin registration failed. Please check your access code or contact system support.'
        });
      }
    }
  };

  const getInputClassName = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? 'error' : '';
  };

  // Password strength indicator
  const renderPasswordStrength = () => {
    if (!formData.password || !touched.password) return null;
    
    const strengthLabels = {
      'weak': 'Weak - Not suitable for admin',
      'fair': 'Fair - Consider a stronger password',
      'good': 'Good',
      'strong': 'Strong'
    };
    
    return (
      <div className="password-strength">
        <div className="password-strength-meter">
          <div className={`strength-${passwordStrength}`}></div>
        </div>
        <p>Password strength: {strengthLabels[passwordStrength]}</p>
      </div>
    );
  };

  return (
    <div className="auth-form-container">
      <h2>Admin Registration</h2>
      <div className="restricted-notice">
        <p>This form is for authorized personnel only. A valid access code is required.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {errors.form && <div className="error-message">{errors.form}</div>}
        
        <div className="form-field">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            className={getInputClassName('name')}
            required
          />
          {touched.name && errors.name ? (
            <div className="error-message">{errors.name}</div>
          ) : touched.name && formData.name ? (
            <div className="valid-message">Name is valid</div>
          ) : null}
        </div>
        
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
          ) : touched.email && /\S+@\S+\.\S+/.test(formData.email) ? (
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
          ) : null}
          {renderPasswordStrength()}
        </div>
        
        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm your password"
            className={getInputClassName('confirmPassword')}
            required
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <div className="error-message">{errors.confirmPassword}</div>
          ) : touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword ? (
            <div className="valid-message">Passwords match</div>
          ) : null}
        </div>
        
        <div className="form-field">
          <label htmlFor="accessCode">Admin Access Code</label>
          <input
            type="password"
            id="accessCode"
            name="accessCode"
            value={formData.accessCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter admin access code"
            className={getInputClassName('accessCode')}
            required
          />
          {touched.accessCode && errors.accessCode ? (
            <div className="error-message">{errors.accessCode}</div>
          ) : touched.accessCode && formData.accessCode ? (
            <div className="valid-message">Access code provided</div>
          ) : null}
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!formValid}
        >
          Register as Admin
        </button>
      </form>
      
      <div className="auth-links">
        <button 
          onClick={switchToLogin} 
          className="link-button"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;