import React from 'react';

function Timeline({ events, selectedDate, onTimeSlotClick }) {
  // Generate hours for the timeline (24-hour format)
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

  return (
    <div style={{ 
      background: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'auto'
    }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Daily Timeline - {selectedDate.toLocaleDateString()}
      </h3>
      
      {/* Timeline Header */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        minWidth: '1200px'
      }}>
        {hours.map(hour => (
          <div
            key={hour}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#666',
              minWidth: '50px'
            }}
          >
            {formatHour(hour)}
          </div>
        ))}
      </div>

      {/* Timeline Bar */}
      <div style={{
        position: 'relative',
        height: '40px',
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        marginBottom: '20px',
        minWidth: '1200px'
      }}>
        {hours.map(hour => {
          const hourEvents = getEventsForHour(hour);
          const hasEvents = hourEvents.length > 0;
          
          return (
            <div
              key={hour}
              onClick={() => onTimeSlotClick && onTimeSlotClick(hour)}
              style={{
                position: 'absolute',
                left: `${(hour / 24) * 100}%`,
                width: `${100 / 24}%`,
                height: '100%',
                background: hasEvents ? '#007bff' : 'transparent',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!hasEvents) {
                  e.target.style.background = '#f0f0f0';
                } else {
                  e.target.style.background = '#0056b3';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = hasEvents ? '#007bff' : 'transparent';
              }}
              title={hasEvents ? 
                `${hourEvents.length} event(s) at ${formatHour(hour)}` : 
                `Available at ${formatHour(hour)}`
              }
            >
              {hasEvents && (
                <span style={{ 
                  color: 'white', 
                  fontSize: '12px', 
                  fontWeight: 'bold' 
                }}>
                  {hourEvents.length}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Events List */}
      {events.length > 0 && (
        <div>
          <h4 style={{ marginBottom: '15px' }}>Today's Events</h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {events
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(event => (
                <div
                  key={event.id}
                  style={{
                    background: '#f8f9fa',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ color: '#007bff' }}>{event.title}</strong>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {event.time} - {event.duration} minutes
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: '12px', padding: '5px 10px' }}
                    onClick={() => window.location.href = `/event/${event.id}`}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Timeline;
