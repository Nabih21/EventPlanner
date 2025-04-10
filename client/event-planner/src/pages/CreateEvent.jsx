import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaImage, FaListUl, FaFileUpload } from 'react-icons/fa';
import api from '../services/api';
import styles from './LandingPage.module.css';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'planned',
    picture: '',
  });
  const [resources, setResources] = useState([]);
  const [uploadingResources, setUploadingResources] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (file.type !== 'application/pdf') {
        setError(`${file.name} is not a PDF file. Only PDF files are allowed.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError(`${file.name} is too large. Maximum file size is 10MB.`);
        return false;
      }
      return true;
    });
    
    setResources(prev => [...prev, ...validFiles]);
  };

  const removeResource = (index) => {
    setResources(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First create the event
      const response = await api.post('/manage/createEvent', formData);
      
      if (response.data && response.data.Event) {
        const eventId = response.data.Event._id;
        console.log("Event created successfully with ID:", eventId);
        
        // If there are resources to upload
        if (resources.length > 0) {
          setUploadingResources(true);
          let uploadErrors = [];
          
          // Upload each resource
          for (const file of resources) {
            try {
              console.log("Uploading file:", file.name);
              const formData = new FormData();
              formData.append('resource', file);
              formData.append('name', file.name);
              
              // Log the request details
              console.log("Upload URL:", `/resources/upload/${eventId}`);
              console.log("File type:", file.type);
              console.log("File size:", file.size);
              
              const uploadResponse = await api.post(`/resources/upload/${eventId}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                // Add timeout and validate status
                timeout: 30000, // 30 seconds timeout
                validateStatus: function (status) {
                  return status >= 200 && status < 300; // Only accept 2xx status codes
                }
              });
              
              console.log("Upload response:", uploadResponse.data);
            } catch (uploadError) {
              console.error("Error uploading file:", uploadError);
              console.error("Error details:", uploadError.response?.data);
              const errorMessage = uploadError.response?.data?.Error || uploadError.message;
              uploadErrors.push(`${file.name}: ${errorMessage}`);
            }
          }
          
          setUploadingResources(false);
          
          // If there were any upload errors, show them to the user
          if (uploadErrors.length > 0) {
            setError(`Some files failed to upload:\n${uploadErrors.join('\n')}`);
            return;
          }
        }
        
        navigate('/dashboard', { state: { activeTab: 'events' } });
      }
    } catch (err) {
      console.error("Error creating event:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.Error || 'Failed to create event. Please try again.');
      setUploadingResources(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ paddingTop: '15rem', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>Create New Event</h1>
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#FEE2E2', 
          color: '#DC2626',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
            Event Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #E2E8F0',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
            Location *
          </label>
          <div style={{ position: 'relative' }}>
            <FaMapMarkerAlt style={{ 
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#718096'
            }} />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                paddingLeft: '2.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #E2E8F0',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #E2E8F0',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
              Start Date *
            </label>
            <div style={{ position: 'relative' }}>
              <FaCalendarAlt style={{ 
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#718096'
              }} />
              <input
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                style={{
                  width: '70%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #E2E8F0',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
              End Date *
            </label>
            <div style={{ position: 'relative' }}>
              <FaCalendarAlt style={{ 
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#718096'
              }} />
              <input
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                style={{
                  width: '70%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #E2E8F0',
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
            Status
          </label>
          <div style={{ position: 'relative' }}>
            <FaListUl style={{ 
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#718096'
            }} />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                paddingLeft: '2.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #E2E8F0',
                backgroundColor: 'white'
              }}
            >
              <option value="planned">Planned</option>
              <option value="in progress">In Progress</option>
              <option value="finished">Finished</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
            Image URL
          </label>
          <div style={{ position: 'relative' }}>
            <FaImage style={{ 
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#718096'
            }} />
            <input
              type="url"
              name="picture"
              value={formData.picture}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '0.75rem',
                paddingLeft: '2.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #E2E8F0',
              }}
            />
          </div>
        </div>

        {/* Resource Upload Section */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4A5568' }}>
            Event Resources (PDF files)
          </label>
          <div style={{ 
            border: '2px dashed #CBD5E0', 
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <FaFileUpload style={{ fontSize: '2rem', color: '#718096', marginBottom: '0.5rem' }} />
            <p style={{ color: '#718096', marginBottom: '1rem' }}>Upload PDF resources for your event</p>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="resource-upload"
            />
            <label 
              htmlFor="resource-upload"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#4299E1',
                color: 'white',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Select Files
            </label>
          </div>
          
          {/* Display selected files */}
          {resources.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#4A5568' }}>Selected Files:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {resources.map((file, index) => (
                  <li 
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem',
                      backgroundColor: '#F7FAFC',
                      borderRadius: '0.375rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <span style={{ color: '#4A5568' }}>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeResource(index)}
                      style={{
                        backgroundColor: '#F56565',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || uploadingResources}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading || uploadingResources ? '#A0AEC0' : '#4299E1',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: loading || uploadingResources ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Creating Event...' : uploadingResources ? 'Uploading Resources...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

