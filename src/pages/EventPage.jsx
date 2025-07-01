import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  // In a real app, you'd fetch this from a global state or API
  // For now, we'll simulate event data based on the ID
  useEffect(() => {
    // Simulate fetching event data
    const mockEvent = {
      id: id,
      title: "Sample Event",
      description: "This is a sample event description. In a real application, this would be fetched from your data source.",
      time: "09:00",
      duration: 60,
      date: new Date().toISOString().split('T')[0]
    };
    setEvent(mockEvent);
  }, [id]);

  const handleEdit = () => {
    alert('Edit functionality would be implemented here');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      alert('Delete functionality would be implemented here');
      navigate('/');
    }
  };

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container"
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading event details...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="container"
    >
      <div style={{ padding: '20px' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          ← Back to Schedule
        </button>
        
        <h1>Event Details</h1>
        
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '8px',
          marginTop: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#007bff', marginBottom: '10px' }}>
              {event.title}
            </h2>
            <div style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>
              <strong>Time:</strong> {event.time} (Duration: {event.duration} minutes)
            </div>
            {event.description && (
              <div style={{ fontSize: '16px', color: '#333', marginBottom: '15px' }}>
                <strong>Description:</strong>
                <p style={{ marginTop: '5px', lineHeight: '1.5' }}>
                  {event.description}
                </p>
              </div>
            )}
            <div style={{ fontSize: '14px', color: '#999' }}>
              <strong>Event ID:</strong> {event.id}
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button 
              className="btn btn-primary" 
              style={{ marginRight: '10px' }}
              onClick={handleEdit}
            >
              Edit Event
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleDelete}
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EventPage;
