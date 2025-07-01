import React, { useState } from 'react';

function TimeRangeSelector({ onTimeRangeChange, selectedFromTime, selectedToTime }) {
  const [fromTime, setFromTime] = useState(selectedFromTime || '09:00');
  const [toTime, setToTime] = useState(selectedToTime || '17:00');

  // Generate time options in 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleFromTimeChange = (time) => {
    setFromTime(time);
    if (onTimeRangeChange) {
      onTimeRangeChange(time, toTime);
    }
  };

  const handleToTimeChange = (time) => {
    setToTime(time);
    if (onTimeRangeChange) {
      onTimeRangeChange(fromTime, time);
    }
  };

  const formatTimeForDisplay = (time) => {
    const [hour, minute] = time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Select Time Range</h3>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* From Time */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#28a745',
            marginBottom: '10px'
          }}>
            From
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333'
          }}>
            {formatTimeForDisplay(fromTime)}
          </div>
          <select
            value={fromTime}
            onChange={(e) => handleFromTimeChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #28a745',
              borderRadius: '6px',
              fontSize: '16px',
              background: 'white',
              cursor: 'pointer',
              minWidth: '100px'
            }}
          >
            {timeOptions.map(time => (
              <option key={`from-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Separator */}
        <div style={{
          width: '40px',
          height: '2px',
          background: '#ddd',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: 0,
            height: 0,
            borderLeft: '5px solid #ddd',
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent'
          }}></div>
        </div>

        {/* To Time */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#dc3545',
            marginBottom: '10px'
          }}>
            To
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333'
          }}>
            {formatTimeForDisplay(toTime)}
          </div>
          <select
            value={toTime}
            onChange={(e) => handleToTimeChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #dc3545',
              borderRadius: '6px',
              fontSize: '16px',
              background: 'white',
              cursor: 'pointer',
              minWidth: '100px'
            }}
          >
            {timeOptions.map(time => (
              <option key={`to-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Time Duration Display */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '16px',
        color: '#666'
      }}>
        Duration: {(() => {
          const fromMinutes = parseInt(fromTime.split(':')[0]) * 60 + parseInt(fromTime.split(':')[1]);
          const toMinutes = parseInt(toTime.split(':')[0]) * 60 + parseInt(toTime.split(':')[1]);
          const duration = toMinutes - fromMinutes;
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          return `${hours}h ${minutes}m`;
        })()}
      </div>
    </div>
  );
}

export default TimeRangeSelector;
