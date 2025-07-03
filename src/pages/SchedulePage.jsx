import React, { useState, useEffect } from 'react';
import DateHeader from '../components/DateHeader';
import TimelineSlots from '../components/TimelineSlots';
import AddEventModal from '../components/AddEventModal';

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('timeKeeper_events');
    const savedTodos = localStorage.getItem('timeKeeper_todos');
    
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error('Error parsing saved events:', error);
      }
    }
    
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error parsing saved todos:', error);
      }
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('timeKeeper_events', JSON.stringify(events));
  }, [events]);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('timeKeeper_todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      completed: eventData.completed || false
    };
    setEvents(prev => [...prev, newEvent]);
    setShowAddEventModal(false);
    setSelectedHour(null);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowAddEventModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowAddEventModal(false);
    setEditingEvent(null);
  };

  const handleAddTodo = (hour, todoText) => {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
      hour,
      date: selectedDate.toISOString().split('T')[0]
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (todoId) => {
    setTodos(prev => prev.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowAddEventModal(true);
  };

  const handleToggleEventCompletion = (eventId) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, completed: !event.completed } : event
    ));
  };

  const handleTimeSlotClick = (hour) => {
    setSelectedHour(hour);
    setShowAddEventModal(true);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleNavigateDate = (newDate) => {
    setSelectedDate(newDate);
  };

  // Get today's stats
  const todayDateString = selectedDate.toISOString().split('T')[0];
  const todayEvents = events.filter(event => event.date === todayDateString);
  const todayTodos = todos.filter(todo => todo.date === todayDateString);
  const completedTodos = todayTodos.filter(todo => todo.completed);

  return (
    <div className="container">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">⏰ Time Saver</h1>
        <p className="text-lg text-secondary">Organize your day with precision and style</p>
      </div>

      {/* Date Navigation */}
      <div className="mb-6">
        <DateHeader 
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onNavigateDate={handleNavigateDate}
        />
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <TimelineSlots
          selectedDate={selectedDate}
          events={todayEvents}
          todos={todayTodos}
          onEditEvent={handleEditEvent}
          onToggleEventCompletion={handleToggleEventCompletion}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onTimeSlotClick={handleTimeSlotClick}
        />
      </div>

      {/* Add/Edit Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          onClose={() => {
            setShowAddEventModal(false);
            setEditingEvent(null);
            setSelectedHour(null);
          }}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
          selectedHour={selectedHour}
        />
      )}
    </div>
  );
}

export default SchedulePage;
