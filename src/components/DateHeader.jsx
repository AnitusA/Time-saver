import React from 'react';

function DateHeader({ selectedDate, onDateChange }) {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateChange = (e) => {
    onDateChange(new Date(e.target.value));
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '25px',
      background: 'linear-gradient(135deg, #fef7ff 0%, #f0f9ff 25%, #ecfdf5 50%, #fffbeb 75%, #fef7ff 100%)',
      borderRadius: '20px',
      marginBottom: '20px',
      boxShadow: '0 15px 50px rgba(139, 92, 246, 0.1), 0 5px 25px rgba(34, 197, 94, 0.08), 0 3px 15px rgba(251, 191, 36, 0.06)',
      border: '1px solid rgba(139, 92, 246, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Colorful animated overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 25%, rgba(251, 191, 36, 0.05) 50%, rgba(236, 72, 153, 0.05) 75%, rgba(139, 92, 246, 0.05) 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
        borderRadius: '20px',
        pointerEvents: 'none'
      }}></div>
      
      <style>
        {`
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            25% {
              background-position: 50% 25%;
            }
            50% {
              background-position: 100% 50%;
            }
            75% {
              background-position: 50% 75%;
            }
          }
        `}
      </style>

      <button 
        className="btn btn-secondary"
        onClick={goToPreviousDay}
        style={{
          background: 'linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          color: '#7c3aed',
          padding: '12px 20px',
          borderRadius: '16px',
          fontWeight: '600',
          boxShadow: '0 6px 25px rgba(139, 92, 246, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '14px',
          letterSpacing: '0.5px',
          position: 'relative',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.02)';
          e.target.style.boxShadow = '0 10px 35px rgba(139, 92, 246, 0.3)';
          e.target.style.background = 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)';
          e.target.style.color = '#6b21a8';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 6px 25px rgba(139, 92, 246, 0.2)';
          e.target.style.background = 'linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%)';
          e.target.style.color = '#7c3aed';
        }}
      >
        ← Previous
      </button>
      
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ 
          marginBottom: '15px', 
          color: '#6b21a8',
          textShadow: '0 2px 4px rgba(139, 92, 246, 0.2)',
          fontSize: '24px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          position: 'relative',
          zIndex: 10
        }}>
          {formatDate(selectedDate)}
        </h2>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
          style={{
            padding: '14px 18px',
            border: '2px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '14px',
            fontSize: '16px',
            background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.98) 0%, rgba(220, 252, 231, 0.95) 100%)',
            color: '#15803d',
            fontWeight: '600',
            boxShadow: '0 6px 25px rgba(34, 197, 94, 0.15), 0 2px 8px rgba(34, 197, 94, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            backdropFilter: 'blur(15px)',
            minWidth: '180px',
            letterSpacing: '0.3px',
            position: 'relative',
            zIndex: 10
          }}
          onFocus={(e) => {
            e.target.style.border = '2px solid rgba(34, 197, 94, 0.6)';
            e.target.style.boxShadow = '0 0 35px rgba(34, 197, 94, 0.3), 0 6px 30px rgba(34, 197, 94, 0.2)';
            e.target.style.transform = 'scale(1.03)';
            e.target.style.background = 'linear-gradient(135deg, rgba(240, 253, 244, 1) 0%, rgba(187, 247, 208, 0.9) 100%)';
          }}
          onBlur={(e) => {
            e.target.style.border = '2px solid rgba(34, 197, 94, 0.3)';
            e.target.style.boxShadow = '0 6px 25px rgba(34, 197, 94, 0.15), 0 2px 8px rgba(34, 197, 94, 0.08)';
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'linear-gradient(135deg, rgba(240, 253, 244, 0.98) 0%, rgba(220, 252, 231, 0.95) 100%)';
          }}
        />
      </div>
      
      <button 
        className="btn btn-secondary"
        onClick={goToNextDay}
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '2px solid rgba(251, 191, 36, 0.4)',
          color: '#d97706',
          padding: '12px 20px',
          borderRadius: '16px',
          fontWeight: '600',
          boxShadow: '0 6px 25px rgba(251, 191, 36, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '14px',
          letterSpacing: '0.5px',
          position: 'relative',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.02)';
          e.target.style.boxShadow = '0 10px 35px rgba(251, 191, 36, 0.35)';
          e.target.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
          e.target.style.color = '#b45309';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 6px 25px rgba(251, 191, 36, 0.2)';
          e.target.style.background = 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)';
          e.target.style.color = '#d97706';
        }}
      >
        Next →
      </button>
    </div>
  );
}

export default DateHeader;
