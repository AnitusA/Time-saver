import React from 'react';

function SlotActionModal({ onClose, timeSlot, onAddEvent, onManageTodos }) {
  const formatTime12Hour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '35px',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '450px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        textAlign: 'center',
        animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '30px',
          gap: '15px'
        }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h3 style={{ 
              margin: 0,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontSize: '22px',
              fontWeight: '400',
              lineHeight: '1.3',
              marginBottom: '8px'
            }}>
              What would you like to do?
            </h3>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'inline-block',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              📍 {formatTime12Hour(timeSlot)}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)';
              e.target.style.transform = 'scale(1.1) rotate(90deg)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button
            onClick={() => {
              onAddEvent();
            }}
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '20px 28px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '80px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(67, 233, 123, 0.5)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(67, 233, 123, 0.3)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(-1px) scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              <span style={{ fontSize: '22px' }}>📅</span>
              Add Event
            </div>
            <div style={{ 
              fontSize: '13px', 
              opacity: 0.85,
              textAlign: 'center',
              lineHeight: '1.3'
            }}>
              Schedule a timed activity
            </div>
          </button>

          <button
            onClick={() => {
              onManageTodos();
            }}
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '20px 28px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '80px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(240, 147, 251, 0.5)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.3)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(-1px) scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              <span style={{ fontSize: '22px' }}>✅</span>
              Manage Todos
            </div>
            <div style={{ 
              fontSize: '13px', 
              opacity: 0.85,
              textAlign: 'center',
              lineHeight: '1.3'
            }}>
              Add tasks and checklist items
            </div>
          </button>
        </div>

        {/* Footer tip */}
        <div style={{
          marginTop: '25px',
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          lineHeight: '1.4'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            marginBottom: '4px'
          }}>
            <span style={{ fontSize: '16px' }}>💡</span>
            <span style={{ fontWeight: '600' }}>Quick Tip</span>
          </div>
          <div>
            <strong>Events</strong> are scheduled activities • <strong>Todos</strong> are task lists for this hour
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotActionModal;
