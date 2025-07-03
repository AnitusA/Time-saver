import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DatePage() {
  const { date } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{ padding: '20px' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          ← Back to Schedule
        </button>
        
        <h1>Events for {date}</h1>
        
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p>Events for this date will be displayed here.</p>
          <p>Date: {date}</p>
        </div>
      </div>
    </div>
  );
}

export default DatePage;
