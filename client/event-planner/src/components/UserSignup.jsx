import { useState, useEffect } from 'react';

const UserSignup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [formValid, setFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  
  // Validate form on input change
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength('');
      return;
    }
    
    // Simple password strength calculation
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
    const formValid = 
      formData.fullName.trim() !== '' && 
      /\S+@\S+\.\S+/.test(formData.email) && 
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword;
    
    setFormValid(formValid);
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
    
    // Full name validation
    if (touched.fullName && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
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
        newErrors.password = 'Password must be at least 6 characters';
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    const newTouched = {
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    };
    
    setTouched(newTouched);
    
    if (validateForm()) {
      try {
        // TODO: Add API call to backend for signup
        console.log('Signup form submitted:', formData);
        
        // Here you would typically:
        // 1. Send user data to backend
        // 2. Handle the response (success/failure)
        // 3. Redirect to login or dashboard
      } catch (error) {
        console.error('Signup failed:', error);
        setErrors({ 
          form: 'Registration failed. Please try again.'
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
      'weak': 'Weak',
      'fair': 'Fair',
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
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {errors.form && <div className="error-message">{errors.form}</div>}
        
        {/* Common fields for all users */}
        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            className={getInputClassName('fullName')}
            required
          />
          {touched.fullName && errors.fullName ? (
            <div className="error-message">{errors.fullName}</div>
          ) : touched.fullName && formData.fullName ? (
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
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!formValid}
        >
          Create Account
        </button>
      </form>
      
      <div className="auth-links">
        <button 
          onClick={switchToLogin} 
          className="link-button"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default UserSignup;