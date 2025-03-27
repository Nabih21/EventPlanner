import { useState, useEffect } from 'react';

const UserSignup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee',
    // Role-specific fields
    organization: '',
    preferences: [],
    stakeholderType: '',
    fieldsOfExpertise: []
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    organization: false,
    stakeholderType: false
  });
  const [formValid, setFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  
  const [availablePreferences, setAvailablePreferences] = useState([
    'Technology', 'Business', 'Arts', 'Science', 'Sports', 'Health'
  ]);
  const [availableExpertise, setAvailableExpertise] = useState([
    'Leadership', 'Technology', 'Marketing', 'Finance', 'Design', 'Education'
  ]);

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
    const commonFieldsValid = 
      formData.fullName.trim() !== '' && 
      /\S+@\S+\.\S+/.test(formData.email) && 
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword;
    
    let roleSpecificValid = true;
    
    // Role-specific validation
    if (formData.role === 'attendee') {
      roleSpecificValid = formData.organization.trim() !== '';
    } else if (formData.role === 'stakeholder') {
      roleSpecificValid = formData.stakeholderType.trim() !== '';
    }
    
    setFormValid(commonFieldsValid && roleSpecificValid);
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

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value]
      });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter(item => item !== value)
      });
    }
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
    
    // Role-specific validation
    if (formData.role === 'attendee' && touched.organization && !formData.organization) {
      newErrors.organization = 'Organization is required for Attendees';
    }
    
    if (formData.role === 'stakeholder' && touched.stakeholderType && !formData.stakeholderType) {
      newErrors.stakeholderType = 'Stakeholder type is required';
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
    
    // Add role-specific touched fields
    if (formData.role === 'attendee') {
      newTouched.organization = true;
    } else if (formData.role === 'stakeholder') {
      newTouched.stakeholderType = true;
    }
    
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

  // Render different fields based on selected role
  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'attendee':
        return (
          <>
            <div className="form-field">
              <label htmlFor="organization">Organization (required)</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your organization"
                className={getInputClassName('organization')}
              />
              {touched.organization && errors.organization ? (
                <div className="error-message">{errors.organization}</div>
              ) : touched.organization && formData.organization ? (
                <div className="valid-message">Organization is valid</div>
              ) : null}
            </div>
            <div className="form-field">
              <label>Preferences</label>
              <div className="checkbox-group">
                {availablePreferences.map(pref => (
                  <div key={pref} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`pref-${pref}`}
                      value={pref}
                      checked={formData.preferences.includes(pref)}
                      onChange={(e) => handleCheckboxChange(e, 'preferences')}
                    />
                    <label htmlFor={`pref-${pref}`}>{pref}</label>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      
      case 'organizer':
        return (
          <div className="form-field">
            <p>Organizer account will be set up with basic information. Event history will be tracked automatically.</p>
          </div>
        );
      
      case 'stakeholder':
        return (
          <div className="form-field">
            <label htmlFor="stakeholderType">Stakeholder Type (required)</label>
            <select
              id="stakeholderType"
              name="stakeholderType"
              value={formData.stakeholderType}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('stakeholderType')}
            >
              <option value="">Select type</option>
              <option value="sponsor">Sponsor</option>
              <option value="investor">Investor</option>
              <option value="partner">Partner</option>
            </select>
            {touched.stakeholderType && errors.stakeholderType ? (
              <div className="error-message">{errors.stakeholderType}</div>
            ) : touched.stakeholderType && formData.stakeholderType ? (
              <div className="valid-message">Stakeholder type is valid</div>
            ) : null}
          </div>
        );
      
      case 'speaker':
        return (
          <div className="form-field">
            <label>Fields of Expertise</label>
            <div className="checkbox-group">
              {availableExpertise.map(exp => (
                <div key={exp} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`exp-${exp}`}
                    value={exp}
                    checked={formData.fieldsOfExpertise.includes(exp)}
                    onChange={(e) => handleCheckboxChange(e, 'fieldsOfExpertise')}
                  />
                  <label htmlFor={`exp-${exp}`}>{exp}</label>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
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
        
        <div className="form-field">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
            <option value="stakeholder">Stakeholder</option>
            <option value="speaker">Speaker</option>
          </select>
        </div>
        
        {/* Role-specific fields */}
        {renderRoleSpecificFields()}
        
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