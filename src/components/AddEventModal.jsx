import React, { useState, useEffect } from 'react';

function AddEventModal({ onClose, onAddEvent, onUpdateEvent, onDeleteEvent, selectedDate, editingEvent = null, selectedHour = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState(60);

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

  // Convert 12-hour to 24-hour format for storage
  const formatTime24Hour = (time12, ampm) => {
    const [hour, minute] = time12.split(':');
    let hour24 = parseInt(hour);
    if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
    if (ampm === 'AM' && hour24 === 12) hour24 = 0;
    return `${hour24.toString().padStart(2, '0')}:${minute}`;
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
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ 
          marginBottom: '20px',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          fontSize: '24px',
          fontWeight: '300'
        }}>
          {editingEvent ? 'Edit Event' : 'Add New Event'}
        </h2>
        <p style={{ 
          marginBottom: '20px', 
          color: 'rgba(255, 255, 255, 0.9)',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          Date: {selectedDate.toLocaleDateString()}
          {selectedHour !== null && !editingEvent && (
            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
              • Time Slot: {formatTime12Hour(`${selectedHour.toString().padStart(2, '0')}:00`)}
            </span>
          )}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #43e97b';
                e.target.style.boxShadow = '0 0 20px rgba(67, 233, 123, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description (optional)"
              rows="3"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                resize: 'vertical',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #43e97b';
                e.target.style.boxShadow = '0 0 20px rgba(67, 233, 123, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}>
                Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#333',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #43e97b';
                  e.target.style.boxShadow = '0 0 20px rgba(67, 233, 123, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
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
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="15"
                max="480"
                step="15"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#333',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #43e97b';
                  e.target.style.boxShadow = '0 0 20px rgba(67, 233, 123, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <div>
              {editingEvent && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this event?')) {
                      onDeleteEvent && onDeleteEvent(editingEvent.id);
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  🗑️ Delete
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingEvent ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
