import React from 'react';
import { useNavigate } from 'react-router-dom';

function TimeSlot({ time, events }) {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '60px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      background: events.length === 0 ? '#f8fff8' : '#fff5f5'
    }}>
      <div style={{ 
        width: '80px',
        padding: '10px',
        background: events.length === 0 ? '#e8f5e8' : '#f8e8e8',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        color: events.length === 0 ? '#28a745' : '#dc3545'
      }}>
        {time}
      </div>
      
      <div style={{ 
        flex: 1,
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {events.length === 0 ? (
          <div style={{ 
            color: '#28a745',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
            ✓ Available
          </div>
        ) : (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <div style={{
              color: '#dc3545',
              fontWeight: 'bold'
            }}>
              ✗ Occupied ({events.length} event{events.length > 1 ? 's' : ''})
            </div>
            <button
              onClick={() => handleEventClick(events[0].id)}
              style={{
                background: '#007bff',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'background-color 0.2s'
              }}
              
              
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeSlot;
