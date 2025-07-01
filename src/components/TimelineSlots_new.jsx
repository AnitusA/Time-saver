import React from 'react';

function TimelineSlots({ events, selectedDate, onSlotClick }) {
  // Generate hours for the timeline (showing 12-hour format like in your image)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      return eventHour === hour;
    });
  };

  // Focus on daytime hours (like your image shows 1 PM - 6 PM range)
  const displayHours = hours.slice(6, 22); // 6 AM to 10 PM

  return (
    <div style={{ 
      background: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <h3 style={{ 
        marginBottom: '30px', 
        textAlign: 'center',
        fontSize: '24px',
        color: '#333'
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
        paddingBottom: '20px'
      }}>
        {/* Hour Labels */}
        <div style={{ 
          display: 'flex',
          marginBottom: '20px',
          minWidth: '800px'
        }}>
          {displayHours.map(hour => (
            <div
              key={`label-${hour}`}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#666',
                minWidth: '80px',
                padding: '0 5px'
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
          background: '#f8f9fa',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          minWidth: '800px',
          display: 'flex',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Tick marks */}
          {displayHours.map(hour => {
            const hourEvents = getEventsForHour(hour);
            const hasEvents = hourEvents.length > 0;
            
            return (
              <div
                key={`slot-${hour}`}
                onClick={() => onSlotClick && onSlotClick(hour)}
                style={{
                  flex: 1,
                  height: '100%',
                  borderRight: hour < displayHours[displayHours.length - 1] ? '1px solid #dee2e6' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: hasEvents ? '#dc3545' : 'white',
                  transition: 'all 0.3s ease',
                  minWidth: '50px'
                }}
                onMouseEnter={(e) => {
                  if (!hasEvents) {
                    e.target.style.background = '#f8f9fa';
                    e.target.style.transform = 'scale(1.02)';
                  } else {
                    e.target.style.background = '#c82333';
                    e.target.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = hasEvents ? '#dc3545' : 'white';
                  e.target.style.transform = 'scale(1)';
                }}
                title={hasEvents ? 
                  `${hourEvents.length} event(s) at ${formatHour(hour)}` : 
                  `Available at ${formatHour(hour)} - Click to add event`
                }
              >
                {/* Tick mark */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  width: '2px',
                  height: '20px',
                  background: '#666',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}></div>
                
                {/* Event indicator */}
                {hasEvents && (
                  <div style={{
                    background: 'white',
                    color: '#dc3545',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '2px solid white'
                  }}>
                    {hourEvents.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Summary */}
      {events.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h4 style={{ marginBottom: '15px', color: '#333' }}>Today's Schedule</h4>
          <div style={{ 
            display: 'grid', 
            gap: '10px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {events
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(event => (
                <div
                  key={event.id}
                  style={{
                    background: '#f8f9fa',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.location.href = `/event/${event.id}`}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#dc3545', marginBottom: '4px' }}>
                      {event.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {event.time} • {event.duration} min
                    </div>
                  </div>
                  <div style={{
                    background: '#dc3545',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    View
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineSlots;
