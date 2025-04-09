import { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { FaUser, FaLock, FaEnvelope, FaUserShield, FaSpinner } from 'react-icons/fa';

const AdminSignup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    adminCode: false
  });
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: ''
  });

  // Validate form on every input change
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Check if form is valid to enable/disable submit button
  useEffect(() => {
    const isFormValid = 
      formData.username.trim() !== '' && 
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.adminCode.trim() !== '' &&
      formData.password === formData.confirmPassword &&
      Object.keys(errors).length === 0;
    
    setFormValid(isFormValid);
  }, [formData, errors]);

  // Calculate password strength
  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, label: '' });
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score++;
    
    // Contains number
    if (/\d/.test(password)) score++;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) score++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) score++;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    let label = '';
    if (score === 0) label = 'Very Weak';
    else if (score === 1) label = 'Weak';
    else if (score === 2) label = 'Fair';
    else if (score === 3) label = 'Good';
    else if (score === 4) label = 'Strong';
    else label = 'Very Strong';
    
    return { score, label };
  };

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
    } else if (touched.username && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    if (touched.email && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (touched.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (touched.password && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (touched.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (touched.confirmPassword && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (touched.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Admin code validation
    if (touched.adminCode && !formData.adminCode.trim()) {
      newErrors.adminCode = 'Admin code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      adminCode: true
    });
    
    if (validateForm()) {
      try {
        setLoading(true);
        setErrors({});
        
        // Use the authService to register admin
        const response = await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'admin',
          adminCode: formData.adminCode
        });
        
        if (response.success) {
          // Redirect to login page
          switchToLogin();
        } else {
          setErrors({ form: response.message || 'Admin registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Admin registration failed:', error);
        setErrors({ 
          form: 'Admin registration failed. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getInputClassName = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? 'error' : '';
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength.score === 0) return '';
    if (passwordStrength.score === 1) return 'strength-weak';
    if (passwordStrength.score === 2) return 'strength-fair';
    if (passwordStrength.score === 3) return 'strength-good';
    if (passwordStrength.score === 4) return 'strength-strong';
    return 'strength-very-strong';
  };

  return (
    <div className="auth-form-container">
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
            placeholder="Choose a username"
            className={getInputClassName('username')}
            required
          />
          {touched.username && errors.username ? (
            <div className="error-message">{errors.username}</div>
          ) : touched.username && formData.username && !errors.username ? (
            <div className="valid-message">Username is valid</div>
          ) : null}
        </div>
        
        <div className="form-field">
          <label htmlFor="email">
            <FaEnvelope className="input-icon" /> Email
          </label>
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
          ) : touched.email && formData.email && !errors.email ? (
            <div className="valid-message">Email is valid</div>
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
            placeholder="Create a password"
            className={getInputClassName('password')}
            required
          />
          {touched.password && errors.password ? (
            <div className="error-message">{errors.password}</div>
          ) : touched.password && formData.password && !errors.password ? (
            <div className="valid-message">Password is valid</div>
          ) : null}
          
          {formData.password && (
            <div className="password-strength">
              <div className="password-strength-meter">
                <div className={getPasswordStrengthClass()} style={{ width: `${passwordStrength.score * 20}%` }}></div>
              </div>
              <p>Strength: {passwordStrength.label}</p>
            </div>
          )}
        </div>
        
        <div className="form-field">
          <label htmlFor="confirmPassword">
            <FaLock className="input-icon" /> Confirm Password
          </label>
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
          ) : touched.confirmPassword && formData.confirmPassword && !errors.confirmPassword ? (
            <div className="valid-message">Passwords match</div>
          ) : null}
        </div>
        
        <div className="form-field">
          <label htmlFor="adminCode">
            <FaUserShield className="input-icon" /> Admin Code
          </label>
          <input
            type="password"
            id="adminCode"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter admin registration code"
            className={getInputClassName('adminCode')}
            required
          />
          {touched.adminCode && errors.adminCode ? (
            <div className="error-message">{errors.adminCode}</div>
          ) : touched.adminCode && formData.adminCode && !errors.adminCode ? (
            <div className="valid-message">Admin code is valid</div>
          ) : null}
        </div>
        
        <div className="restricted-notice">
          <p>⚠️ Admin registration is restricted. You must have a valid admin code to register.</p>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!formValid || loading}
        >
          {loading ? (
            <>
              <FaSpinner className="spinner-icon" /> Creating Admin Account...
            </>
          ) : (
            'Create Admin Account'
          )}
        </button>
      </form>
      
      <div className="auth-links">
        <button 
          onClick={switchToLogin} 
          className="link-button"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;