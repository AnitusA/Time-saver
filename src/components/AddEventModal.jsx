import React, { useState, useEffect } from 'react';

function AddEventModal({ onClose, onAddEvent, onUpdateEvent, onDeleteEvent, selectedDate, editingEvent = null, selectedHour = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If editing an event, populate the form with existing data
  // If a specific hour is selected, set that time
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description || '');
      setTime(editingEvent.time);
      setDuration(editingEvent.duration);
    } else if (selectedHour !== null) {
      // Set the time to the clicked hour
      const timeString = `${selectedHour.toString().padStart(2, '0')}:00`;
      setTime(timeString);
    }
  }, [editingEvent, selectedHour]);

  // Convert 24-hour to 12-hour format for display
  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title for the event');
      return;
    }

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      time,
      duration
    };

    if (editingEvent) {
      onUpdateEvent({
        ...editingEvent,
        ...eventData
      });
    } else {
      onAddEvent({
        id: Date.now(),
        ...eventData,
        date: selectedDate.toISOString().split('T')[0]
      });
    }

    // Reset form
    setTitle('');
    setDescription('');
    setTime('09:00');
    setDuration(60);
  };

  // Generate time options in 12-hour format
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour24 = i.toString().padStart(2, '0') + ':00';
    return {
      value: hour24,
      label: formatTime12Hour(hour24)
    };
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '10px' : '20px',
      overflow: 'auto',
      paddingTop: isMobile ? '20px' : '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(6, 182, 212, 0.95) 50%, rgba(16, 185, 129, 0.95) 100%)',
        padding: isMobile ? '16px' : '30px',
        borderRadius: isMobile ? '20px' : '24px',
        width: '100%',
        maxWidth: isMobile ? '95vw' : '500px',
        maxHeight: isMobile ? '95vh' : '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.15)',
        border: '2px solid rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(25px)',
        margin: 'auto',
        position: 'relative',
        animation: 'modalSlideIn 0.3s ease-out'
      }}>
        <style>{`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(${isMobile ? '20px' : '30px'}) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @media (max-width: 768px) {
            .modal-input {
              font-size: 16px !important; /* Prevent zoom on iOS */
            }
          }
        `}</style>
        <h2 style={{ 
          marginBottom: isMobile ? '16px' : '24px',
          color: 'white',
          textShadow: '0 3px 8px rgba(0,0,0,0.4)',
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: '0.5px'
        }}>
          {editingEvent ? '✏️ Edit Event' : '➕ Add New Event'}
        </h2>
        
        {/* Date display with simple arrows */}
        <div style={{ 
          marginBottom: isMobile ? '20px' : '24px', 
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.25)',
          padding: isMobile ? '16px' : '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '16px' : '20px'
          }}>
            <button
              type="button"
              onClick={() => {
                const prevDate = new Date(selectedDate);
                prevDate.setDate(prevDate.getDate() - 1);
                // You'll need to pass this back to parent component
                console.log('Previous date:', prevDate);
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                width: isMobile ? '44px' : '48px',
                height: isMobile ? '44px' : '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: isMobile ? '18px' : '20px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ←
            </button>
            
            <div style={{
              color: 'white',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              minWidth: isMobile ? '120px' : '140px'
            }}>
              📅 {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            
            <button
              type="button"
              onClick={() => {
                const nextDate = new Date(selectedDate);
                nextDate.setDate(nextDate.getDate() + 1);
                // You'll need to pass this back to parent component
                console.log('Next date:', nextDate);
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                width: isMobile ? '44px' : '48px',
                height: isMobile ? '44px' : '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: isMobile ? '18px' : '20px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              →
            </button>
          </div>
          
          {selectedHour !== null && !editingEvent && (
            <div style={{ 
              marginTop: '12px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '500'
            }}>
              ⏰ Time Slot: {formatTime12Hour(`${selectedHour.toString().padStart(2, '0')}:00`)}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: isMobile ? '16px' : '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontSize: isMobile ? '15px' : '16px'
            }}>
              📝 Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="modal-input"
              style={{
                width: '100%',
                padding: isMobile ? '16px 14px' : '14px 16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: isMobile ? '14px' : '12px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#333',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid rgba(16, 185, 129, 0.8)';
                e.target.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
              required
            />
          </div>

          <div style={{ marginBottom: isMobile ? '16px' : '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontSize: isMobile ? '15px' : '16px'
            }}>
              📄 Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description (optional)"
              rows={isMobile ? "3" : "4"}
              className="modal-input"
              style={{
                width: '100%',
                padding: isMobile ? '16px 14px' : '14px 16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: isMobile ? '14px' : '12px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#333',
                resize: 'vertical',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                minHeight: isMobile ? '80px' : '100px'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid rgba(16, 185, 129, 0.8)';
                e.target.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '20px', 
            marginBottom: isMobile ? '24px' : '30px' 
          }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: isMobile ? '15px' : '16px'
              }}>
                ⏰ Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="modal-input"
                style={{
                  width: '100%',
                  padding: isMobile ? '16px 14px' : '14px 16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: isMobile ? '14px' : '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#333',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid rgba(16, 185, 129, 0.8)';
                  e.target.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
              >
                {timeOptions.map(timeOption => (
                  <option key={timeOption.value} value={timeOption.value}>
                    {timeOption.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: isMobile ? '15px' : '16px'
              }}>
                ⏱️ Duration (min)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="15"
                max="480"
                step="15"
                className="modal-input"
                style={{
                  width: '100%',
                  padding: isMobile ? '16px 14px' : '14px 16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: isMobile ? '14px' : '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#333',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid rgba(16, 185, 129, 0.8)';
                  e.target.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '12px' : '16px', 
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center'
          }}>
            <div style={{ order: isMobile ? 2 : 1 }}>
              {editingEvent && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this event?')) {
                      onDeleteEvent && onDeleteEvent(editingEvent.id);
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%)',
                    color: '#dc2626',
                    border: '2px solid rgba(239, 68, 68, 0.3)',
                    padding: isMobile ? '14px 20px' : '12px 18px',
                    borderRadius: isMobile ? '14px' : '12px',
                    fontSize: isMobile ? '15px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: isMobile ? '100%' : 'auto',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.3)';
                    e.target.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #f87171 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
                    e.target.style.background = 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%)';
                  }}
                >
                  🗑️ Delete Event
                </button>
              )}
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '12px' : '16px',
              order: isMobile ? 1 : 2,
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : 'auto'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: isMobile ? '16px 24px' : '12px 20px',
                  borderRadius: isMobile ? '14px' : '12px',
                  fontSize: isMobile ? '16px' : '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  flex: isMobile ? '1' : 'none',
                  minWidth: isMobile ? 'auto' : '100px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                  color: '#16a34a',
                  border: '2px solid rgba(34, 197, 94, 0.4)',
                  padding: isMobile ? '16px 24px' : '12px 20px',
                  borderRadius: isMobile ? '14px' : '12px',
                  fontSize: isMobile ? '16px' : '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: isMobile ? '1' : 'none',
                  minWidth: isMobile ? 'auto' : '120px',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.4)';
                  e.target.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #86efac 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.2)';
                  e.target.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)';
                }}
              >
                {editingEvent ? '✅ Update Event' : '➕ Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
