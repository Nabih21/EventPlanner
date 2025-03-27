import { useState, useEffect } from 'react';
import { authService } from '../services/api';

const UserSignup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false
  });
  const [formValid, setFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);
  
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
      formData.username.trim() !== '' && 
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
    
    // Username validation
    if (touched.username && !formData.username.trim()) {
      newErrors.username = 'Username is required';
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
      username: true,
      password: true,
      confirmPassword: true
    };
    
    setTouched(newTouched);
    
    if (validateForm()) {
      try {
        setLoading(true);
        setErrors({});
        
        // Use the authService to register
        const response = await authService.register(formData);
        
        if (response.message === 'User already exists') {
          setErrors({ form: 'Username already taken. Please choose a different username.' });
          return;
        }
        
        if (response.message === 'User registered successfully') {
          // Show success message and redirect to login
          alert('Registration successful! Please log in with your new account.');
          switchToLogin();
        } else {
          setErrors({ form: 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Signup failed:', error);
        setErrors({ 
          form: 'Registration failed. Please try again later.'
        });
      } finally {
        setLoading(false);
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
        
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Choose a username"
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
          disabled={!formValid || loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
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