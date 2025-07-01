import React from 'react';

function TimelineSlots({ events, selectedDate, onSlotClick, onEventEdit, todos, onTodoClick }) {
  // Generate hours for the timeline (showing 12-hour format like in your image)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Add CSS animation styles for booked slots
  const pulseAnimation = {
    animation: 'pulse 3s infinite',
    '@keyframes pulse': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.8 },
      '100%': { opacity: 1 }
    }
  };

  // Inject CSS for the pulse animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentlePulse {
        0% { 
          box-shadow: 0 8px 25px rgba(0,0,0,0.3), 0 0 20px currentColor;
          opacity: 1;
        }
        50% { 
          box-shadow: 0 12px 35px rgba(0,0,0,0.4), 0 0 30px currentColor;
          opacity: 0.9;
        }
        100% { 
          box-shadow: 0 8px 25px rgba(0,0,0,0.3), 0 0 20px currentColor;
          opacity: 1;
        }
      }
      @keyframes eventIconPulse {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        50% {
          transform: scale(1.1);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
        }
      }
      @keyframes todoIconPulse {
        0%, 100% {
          transform: scale(1) rotate(0deg);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        25% {
          transform: scale(1.05) rotate(-2deg);
          filter: drop-shadow(0 3px 6px rgba(255, 107, 107, 0.4));
        }
        75% {
          transform: scale(1.05) rotate(2deg);
          filter: drop-shadow(0 3px 6px rgba(255, 107, 107, 0.4));
        }
      }
      .booked-slot {
        animation: gentlePulse 4s ease-in-out infinite;
      }
      .todo-slot {
        animation: todoGlow 3s ease-in-out infinite;
        position: relative;
      }
      .todo-slot::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #eb4d4b, #6c5ce7);
        background-size: 400% 400%;
        border-radius: 14px;
        z-index: -1;
        animation: gradientShift 3s ease infinite;
        opacity: 0.3;
      }
      @keyframes todoGlow {
        0%, 100% { 
          box-shadow: 0 8px 25px rgba(0,0,0,0.3), 0 0 20px currentColor;
        }
        50% { 
          box-shadow: 0 12px 35px rgba(0,0,0,0.4), 0 0 30px currentColor, 0 0 40px rgba(255, 107, 107, 0.5);
        }
      }
      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
      .available-slot:hover::after {
        content: '+';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Format time for display in 12-hour format
  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      return eventHour === hour;
    });
  };

  const getTodosForHour = (hour) => {
    return todos ? todos.filter(todo => todo.timeSlot === hour) : [];
  };

  // Enhanced color schemes for different time periods with more vibrant and distinct colors
  const getTimeColors = (hour, hasEvents, hasTodos) => {
    // Special styling for slots with todos but no events
    if (!hasEvents && hasTodos) {
      if (hour >= 0 && hour < 3) return { bg: 'linear-gradient(135deg, #e1bee7 0%, #ba68c8 100%)', border: '#9c27b0', text: 'white' }; // Midnight - Purple Todo
      if (hour >= 3 && hour < 6) return { bg: 'linear-gradient(135deg, #f8bbd9 0%, #e91e63 100%)', border: '#c2185b', text: 'white' }; // Late Night - Pink Todo
      if (hour >= 6 && hour < 9) return { bg: 'linear-gradient(135deg, #ffe0b2 0%, #ff9800 100%)', border: '#f57c00', text: 'white' }; // Early Morning - Orange Todo
      if (hour >= 9 && hour < 12) return { bg: 'linear-gradient(135deg, #bbdefb 0%, #2196f3 100%)', border: '#1976d2', text: 'white' }; // Late Morning - Blue Todo
      if (hour >= 12 && hour < 15) return { bg: 'linear-gradient(135deg, #c8e6c9 0%, #4caf50 100%)', border: '#388e3c', text: 'white' }; // Early Afternoon - Green Todo
      if (hour >= 15 && hour < 18) return { bg: 'linear-gradient(135deg, #ffcc02 0%, #ff6f00 100%)', border: '#e65100', text: 'white' }; // Late Afternoon - Amber Todo
      if (hour >= 18 && hour < 21) return { bg: 'linear-gradient(135deg, #ffab91 0%, #ff5722 100%)', border: '#d84315', text: 'white' }; // Evening - Deep Orange Todo
      return { bg: 'linear-gradient(135deg, #ce93d8 0%, #9c27b0 100%)', border: '#7b1fa2', text: 'white' }; // Late Evening - Deep Purple Todo
    }
    
    if (hasEvents) {
      // Vibrant gradient colors for booked slots based on time of day
      if (hour >= 0 && hour < 3) return { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: '#5a67d8', text: 'white' }; // Midnight - Deep Purple
      if (hour >= 3 && hour < 6) return { bg: 'linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)', border: '#7b68ee', text: 'white' }; // Late Night - Purple-Teal
      if (hour >= 6 && hour < 9) return { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', border: '#ff8a65', text: '#333' }; // Early Morning - Peach
      if (hour >= 9 && hour < 12) return { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', border: '#2196f3', text: 'white' }; // Late Morning - Bright Blue
      if (hour >= 12 && hour < 15) return { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', border: '#4caf50', text: 'white' }; // Early Afternoon - Green-Cyan
      if (hour >= 15 && hour < 18) return { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', border: '#ff9800', text: '#333' }; // Late Afternoon - Pink-Yellow
      if (hour >= 18 && hour < 21) return { bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', border: '#e74c3c', text: 'white' }; // Evening - Red-Orange
      return { bg: 'linear-gradient(135deg, #a044ff 0%, #6c5ce7 100%)', border: '#9c27b0', text: 'white' }; // Late Evening - Purple
    } else {
      // Enhanced soft gradient colors for available slots with more distinction
      if (hour >= 0 && hour < 3) return { bg: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)', border: '#9fa8da', text: '#5c6bc0' }; // Midnight - Light Purple
      if (hour >= 3 && hour < 6) return { bg: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', border: '#ce93d8', text: '#8e24aa' }; // Late Night - Lavender
      if (hour >= 6 && hour < 9) return { bg: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)', border: '#ffd54f', text: '#f57f17' }; // Early Morning - Light Yellow
      if (hour >= 9 && hour < 12) return { bg: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', border: '#64b5f6', text: '#1976d2' }; // Late Morning - Light Blue
      if (hour >= 12 && hour < 15) return { bg: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)', border: '#81c784', text: '#388e3c' }; // Early Afternoon - Light Green
      if (hour >= 15 && hour < 18) return { bg: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)', border: '#ffb74d', text: '#f57c00' }; // Late Afternoon - Light Orange
      if (hour >= 18 && hour < 21) return { bg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)', border: '#f48fb1', text: '#c2185b' }; // Evening - Light Pink
      return { bg: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', border: '#ce93d8', text: '#7b1fa2' }; // Late Evening - Light Purple
    }
  };

  // Show all 24 hours of the day
  const displayHours = hours; // Full day: 12 AM to 11 PM

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
      overflow: 'hidden'
    }}>
      <h3 style={{ 
        marginBottom: '30px', 
        textAlign: 'center',
        fontSize: '28px',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        fontWeight: '300'
      }}>
        {selectedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}
      </h3>
      
      {/* Timeline Container */}
      <div style={{ 
        overflowX: 'auto',
        paddingBottom: '20px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.5) transparent'
      }}>
        {/* Hour Labels */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(24, 1fr)',
          gap: '8px',
          marginBottom: '20px',
          minWidth: '1440px'
        }}>
          {displayHours.map(hour => (
            <div
              key={`label-${hour}`}
              style={{
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'white',
                padding: '4px 2px',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              {formatHour(hour)}
            </div>
          ))}
        </div>

        {/* Timeline Bar with tick marks */}
        <div style={{
          position: 'relative',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '12px',
          minWidth: '1440px',
          display: 'grid',
          gridTemplateColumns: 'repeat(24, 1fr)',
          gap: '8px',
          padding: '8px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        }}>
          {/* Tick marks */}
          {displayHours.map(hour => {
            const hourEvents = getEventsForHour(hour);
            const hourTodos = getTodosForHour(hour);
            const hasEvents = hourEvents.length > 0;
            const hasTodos = hourTodos.length > 0;
            const colors = getTimeColors(hour, hasEvents, hasTodos);
            
            return (
              <div
                key={`slot-${hour}`}
                className={`${hasEvents ? 'booked-slot' : 'available-slot'} ${hasTodos && !hasEvents ? 'todo-slot' : ''}`}
                onClick={() => onSlotClick && onSlotClick(hour)}
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: colors.bg,
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  borderRadius: '8px',
                  border: `2px solid ${colors.border}`,
                  transform: hasEvents ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: hasEvents ? 
                    `0 8px 25px rgba(0,0,0,0.3), 0 0 15px ${colors.border}40` : 
                    `0 4px 15px rgba(0,0,0,0.1), 0 0 8px ${colors.border}20`,
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.15)';
                  e.target.style.boxShadow = hasEvents ? 
                    `0 12px 35px rgba(0,0,0,0.4), 0 0 25px ${colors.border}60` : 
                    `0 8px 25px rgba(0,0,0,0.2), 0 0 15px ${colors.border}40`;
                  e.target.style.borderWidth = '3px';
                  e.target.style.zIndex = '10';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = hasEvents ? 'scale(1.05)' : 'scale(1)';
                  e.target.style.boxShadow = hasEvents ? 
                    `0 8px 25px rgba(0,0,0,0.3), 0 0 15px ${colors.border}40` : 
                    `0 4px 15px rgba(0,0,0,0.1), 0 0 8px ${colors.border}20`;
                  e.target.style.borderWidth = '2px';
                  e.target.style.zIndex = '1';
                }}
                title={
                  hasEvents && hasTodos ? 
                    `Events & Todos at ${formatHour(hour)} - Click to manage` :
                  hasEvents ? 
                    `Events at ${formatHour(hour)} - Click to manage` :
                  hasTodos ?
                    `Todos at ${formatHour(hour)} - Click to manage` :
                    `Available at ${formatHour(hour)} - Click to add event or todos`
                }
              >
                {/* Tick mark */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  width: '2px',
                  height: '20px',
                  background: 'white',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '2px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}></div>
                
                {/* Slot content - centered icons based on content */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Both events and todos */}
                  {hasEvents && hasTodos && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {/* Event Icon */}
                      <div style={{
                        fontSize: '18px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        animation: 'eventIconPulse 2s ease-in-out infinite'
                      }}>
                        📅
                      </div>
                      {/* Todo Icon */}
                      <div style={{
                        fontSize: '16px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        animation: 'todoIconPulse 2.5s ease-in-out infinite'
                      }}>
                        ✅
                      </div>
                    </div>
                  )}
                  
                  {/* Event only */}
                  {hasEvents && !hasTodos && (
                    <div style={{
                      fontSize: '20px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      animation: 'eventIconPulse 2s ease-in-out infinite'
                    }}>
                      📅
                    </div>
                  )}
                  
                  {/* Todo only */}
                  {!hasEvents && hasTodos && (
                    <div style={{
                      fontSize: '20px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      animation: 'todoIconPulse 2.5s ease-in-out infinite'
                    }}>
                      ✅
                    </div>
                  )}
                  
                  {/* Available indicator (no events, no todos) */}
                  {!hasEvents && !hasTodos && (
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'white',
                      opacity: 0.9,
                      border: `2px solid ${colors.border}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Summary */}
      {events.length > 0 && (
        <div style={{ 
          marginTop: '30px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        }}>
          <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '20px' }}>Today's Schedule</h4>
          <div style={{ 
            display: 'grid', 
            gap: '12px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {events
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((event, index) => {
                const eventHour = parseInt(event.time.split(':')[0]);
                const colors = getTimeColors(eventHour, true);
                return (
                    <div
                    key={event.id}
                    style={{
                      background: colors.bg,
                      padding: '16px 20px',
                      borderRadius: '10px',
                      border: `2px solid ${colors.border}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', color: colors.text, marginBottom: '4px', fontSize: '16px' }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: '14px', color: colors.text, opacity: 0.8 }}>
                        {formatTime12Hour(event.time)} • {event.duration} min
                      </div>
                      {event.description && (
                        <div style={{ fontSize: '12px', color: colors.text, opacity: 0.7, marginTop: '4px' }}>
                          {event.description}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventEdit && onEventEdit(event);
                        }}
                        style={{
                          background: colors.border,
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineSlots;
