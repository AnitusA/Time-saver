import React, { useState } from 'react';

function TimelineSlots({ 
  selectedDate, 
  events, 
  todos, 
  onEditEvent, 
  onToggleEventCompletion,
  onAddTodo, 
  onToggleTodo, 
  onDeleteTodo, 
  onTimeSlotClick 
}) {
  // Generate hours for display (showing full day)
  const hours = Array.from({ length: 24 }, (_, i) => i); // 12 AM to 11 PM

  // Format hour to 12-hour format
  const formatHour = (hour) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  };

  // Format time with minutes
  const formatTimeWithMinutes = (hour, minute) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  // Get events for a specific hour
  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      const eventDuration = event.duration || 60;
      const eventEndHour = eventHour + Math.ceil(eventDuration / 60);
      return hour >= eventHour && hour < eventEndHour;
    });
  };

  // Get todos for a specific hour
  const getTodosForHour = (hour) => {
    return todos.filter(todo => {
      const todoDate = selectedDate.toISOString().split('T')[0];
      return todo.hour === hour && todo.date === todoDate;
    });
  };

  // Check if any event in this hour is completed
  const hasCompletedEventForHour = (hour) => {
    const hourEvents = getEventsForHour(hour);
    return hourEvents.some(event => event.completed);
  };

  return (
    <div className="card">
      <div className="card-body">
        {/* Horizontal Timeline */}
        <div className="horizontal-timeline mb-6">
          {/* Timeline Container with perfect alignment */}
          <div className="timeline-container">
            {/* Mobile: Two-row layout */}
            <div className="mobile-timeline">
              {/* First Row: 12 AM - 11 AM */}
              <div className="timeline-hours">
                {hours.slice(0, 12).map(hour => (
                  <div key={hour} className="timeline-hour">
                    <div className="text-xs font-medium text-primary">
                      {formatHour(hour)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="timeline-slots mb-4">
                {hours.slice(0, 12).map(hour => {
                  const hasEvents = getEventsForHour(hour).length > 0;
                  const hasCompletedEvent = hasCompletedEventForHour(hour);
                  const hourTodos = getTodosForHour(hour);
                  
                  return (
                    <div key={hour} className="relative">
                      <div
                        className={`timeline-slot-box rounded-md cursor-pointer border-2 transition-all duration-200 ${
                          hasEvents 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-gray-200 border-gray-300 hover:border-gray-400 hover:bg-gray-300'
                        }`}
                        onClick={() => onTimeSlotClick(hour)}
                      >
                        {/* Clean slot - color indicates status */}
                      </div>
                      
                      {/* Todo Box for Completed Events */}
                      {hasCompletedEvent && hourTodos.length > 0 && (
                        <div className="absolute top-full left-0 w-full z-10 mt-1">
                          <div className="bg-white border-2 border-success rounded-lg shadow-lg p-2 text-xs">
                            <div className="font-semibold text-success mb-1">
                              ✅ Todos
                            </div>
                            
                            <div className="space-y-1">
                              {hourTodos.map(todo => (
                                <div key={todo.id} className={`text-xs ${todo.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                                  • {todo.text}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Second Row: 12 PM - 11 PM */}
              <div className="timeline-hours">
                {hours.slice(12, 24).map(hour => (
                  <div key={hour} className="timeline-hour">
                    <div className="text-xs font-medium text-primary">
                      {formatHour(hour)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="timeline-slots mb-4">
                {hours.slice(12, 24).map(hour => {
                  const hasEvents = getEventsForHour(hour).length > 0;
                  const hasCompletedEvent = hasCompletedEventForHour(hour);
                  const hourTodos = getTodosForHour(hour);
                  
                  return (
                    <div key={hour} className="relative">
                      <div
                        className={`timeline-slot-box rounded-md cursor-pointer border-2 transition-all duration-200 ${
                          hasEvents 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-gray-200 border-gray-300 hover:border-gray-400 hover:bg-gray-300'
                        }`}
                        onClick={() => onTimeSlotClick(hour)}
                      >
                        {/* Clean slot - color indicates status */}
                      </div>
                      
                      {/* Todo Box for Completed Events */}
                      {hasCompletedEvent && hourTodos.length > 0 && (
                        <div className="absolute top-full left-0 w-full z-10 mt-1">
                          <div className="bg-white border-2 border-success rounded-lg shadow-lg p-2 text-xs">
                            <div className="font-semibold text-success mb-1">
                              ✅ Todos
                            </div>
                            
                            <div className="space-y-1">
                              {hourTodos.map(todo => (
                                <div key={todo.id} className={`text-xs ${todo.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                                  • {todo.text}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Single-row layout */}
            <div className="desktop-timeline">
              {/* Time Labels */}
              <div className="timeline-hours">
                {hours.map(hour => (
                  <div key={hour} className="timeline-hour">
                    <div className="text-xs font-medium text-primary">
                      {formatHour(hour)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Slot Boxes */}
              <div className="timeline-slots">
                {hours.map(hour => {
                  const hasEvents = getEventsForHour(hour).length > 0;
                  const hasCompletedEvent = hasCompletedEventForHour(hour);
                  const hourTodos = getTodosForHour(hour);
                  
                  return (
                    <div key={hour} className="relative">
                      <div
                        className={`timeline-slot-box rounded-md cursor-pointer border-2 transition-all duration-200 ${
                          hasEvents 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-gray-200 border-gray-300 hover:border-gray-400 hover:bg-gray-300'
                        }`}
                        onClick={() => onTimeSlotClick(hour)}
                      >
                        {/* Clean slot - color indicates status */}
                      </div>
                      
                      {/* Todo Box for Completed Events */}
                      {hasCompletedEvent && hourTodos.length > 0 && (
                        <div className="absolute top-full left-0 w-full z-10 mt-1">
                          <div className="bg-white border-2 border-success rounded-lg shadow-lg p-2 text-xs">
                            <div className="font-semibold text-success mb-1">
                              ✅ Todos
                            </div>
                            
                            <div className="space-y-1">
                              {hourTodos.map(todo => (
                                <div key={todo.id} className={`text-xs ${todo.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                                  • {todo.text}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* All Events */}
        <div className="events-list">
          <h3 className="text-lg font-semibold text-primary mb-4">
            📅 Today's Events
          </h3>
          
          <div className="space-y-3">
            {events.map(event => (
              <div 
                key={event.id} 
                className={`event-card ${event.completed ? 'opacity-75 bg-gradient-to-r from-green-50 to-green-100' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {/* Checkbox for completion */}
                  <input
                    type="checkbox"
                    checked={event.completed || false}
                    onChange={(e) => {
                      e.stopPropagation();
                      onToggleEventCompletion(event.id);
                    }}
                    className="w-5 h-5 text-success bg-white border-2 border-white rounded focus:ring-success focus:ring-2 cursor-pointer"
                  />
                  
                  {/* Event content */}
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => onEditEvent(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {event.completed && <span className="text-green-300">✅</span>}
                          <span className={event.completed ? 'line-through' : ''}>{event.title}</span>
                        </div>
                        {event.description && (
                          <div className="text-sm opacity-90 mt-1">{event.description}</div>
                        )}
                        <div className="text-xs opacity-75 mt-1">
                          {event.time} • {event.duration} minutes
                          {event.completed && <span className="ml-2 text-green-300 font-medium">• Completed</span>}
                        </div>
                      </div>
                      <div className="text-lg">✏️</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center py-8 text-secondary">
                <div className="text-4xl mb-2">📅</div>
                <div>No events scheduled for today</div>
                <button 
                  onClick={() => onTimeSlotClick(9)}
                  className="btn btn-sm btn-primary mt-3"
                >
                  Add Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSlots;
