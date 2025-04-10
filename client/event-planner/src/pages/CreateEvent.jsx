import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaImage, FaListUl } from 'react-icons/fa';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/manage/createEvent', formData);
      if (response.data && response.data.Event) {
        navigate(`/events/${response.data.Event._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.Error || 'Failed to create event. Please try again.');
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

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4F46E5',
            color: 'white',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

