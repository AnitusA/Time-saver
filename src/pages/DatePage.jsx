import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function DatePage() {
  const { date } = useParams();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
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
    </motion.div>
  );
}

export default DatePage;
