import React, { useState, useEffect } from 'react';

function AddEventModal({ onClose, onAddEvent, onUpdateEvent, onDeleteEvent, selectedDate, editingEvent = null, selectedHour = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [completed, setCompleted] = useState(false);

  // If editing an event, populate the form with existing data
  // If a specific hour is selected, set that time
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description || '');
      setTime(editingEvent.time);
      setDuration(editingEvent.duration);
      setCompleted(editingEvent.completed || false);
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
      duration: parseInt(duration),
      date: selectedDate.toISOString().split('T')[0],
      completed: completed
    };

    if (editingEvent) {
      onUpdateEvent({ ...editingEvent, ...eventData });
    } else {
      onAddEvent(eventData);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(editingEvent.id);
    }
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    // You might need to pass this back to parent component
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    // You might need to pass this back to parent component
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ width: '100%', maxWidth: '32rem' }}>
        {/* Header */}
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">
              {editingEvent ? '✏️ Edit Event' : '➕ Create New Event'}
            </h2>
            <button 
              onClick={onClose}
              className="text-primary hover:text-danger p-1 rounded-md hover:bg-gray-100"
              style={{ fontSize: '1.25rem', lineHeight: 1 }}
            >
              ✕
            </button>
          </div>
          
          {/* Date Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button 
              onClick={goToPreviousDay}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.5rem', width: '2.5rem', height: '2.5rem' }}
            >
              ←
            </button>
            
            <div className="text-center">
              <div className="text-lg font-medium text-primary">
                📅 {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <button 
              onClick={goToNextDay}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.5rem', width: '2.5rem', height: '2.5rem' }}
            >
              →
            </button>
          </div>
          
          {selectedHour !== null && !editingEvent && (
            <div className="text-center mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                ⏰ Time Slot: {formatTime12Hour(`${selectedHour.toString().padStart(2, '0')}:00`)}
              </span>
            </div>
          )}
        </div>
        
        {/* Form */}
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div className="form-group">
              <label className="form-label">
                📝 Event Title *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter event title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Event Description */}
            <div className="form-group">
              <label className="form-label">
                📄 Description
              </label>
              <textarea
                className="form-textarea"
                placeholder="Add event description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Time and Duration Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">
                  🕐 Start Time
                </label>
                <select
                  className="form-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour24 = i.toString().padStart(2, '0') + ':00';
                    return (
                      <option key={hour24} value={hour24}>
                        {formatTime12Hour(hour24)}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  ⏱️ Duration (minutes)
                </label>
                <select
                  className="form-select"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                  <option value={180}>3 hours</option>
                  <option value={240}>4 hours</option>
                </select>
              </div>
            </div>

            {/* Event Status */}
            <div className="form-group">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="w-5 h-5 text-success bg-gray-100 border-gray-300 rounded focus:ring-success focus:ring-2"
                />
                <span className="form-label mb-0">
                  ✅ Mark as completed
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              {editingEvent && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger w-full"
                >
                  🗑️ Delete Event
                </button>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  {editingEvent ? '✅ Update Event' : '➕ Create Event'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEventModal;
