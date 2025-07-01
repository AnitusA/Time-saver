import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DateHeader from '../components/DateHeader';
import TimelineSlots from '../components/TimelineSlots';
import AddEventModal from '../components/AddEventModal';
import TodoModal from '../components/TodoModal';
import SlotActionModal from '../components/SlotActionModal';

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showSlotActionModal, setShowSlotActionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [todoTimeSlot, setTodoTimeSlot] = useState(9);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      date: selectedDate.toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
    setSelectedHour(null);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowModal(false);
    setEditingEvent(null);
    setSelectedHour(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowModal(false);
    setEditingEvent(null);
    setSelectedHour(null);
  };

  const handleSlotClick = (hour) => {
    setSelectedHour(hour);
    setShowSlotActionModal(true);
  };

  const handleEventEdit = (event) => {
    setEditingEvent(event);
    setSelectedHour(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingEvent(null);
    setSelectedHour(null);
  };

  const handleTodoClick = (hour) => {
    setTodoTimeSlot(hour);
    setShowTodoModal(true);
  };

  const handleTodoModalClose = () => {
    setShowTodoModal(false);
  };

  const handleSlotActionModalClose = () => {
    setShowSlotActionModal(false);
    setSelectedHour(null);
  };

  const handleAddEventFromSlot = () => {
    setEditingEvent(null);
    setShowModal(true);
    setShowSlotActionModal(false);
    // Keep selectedHour so it gets passed to AddEventModal
  };

  const handleManageTodosFromSlot = () => {
    setTodoTimeSlot(selectedHour);
    setShowTodoModal(true);
    setShowSlotActionModal(false);
  };

  const addTodo = (todoData) => {
    const newTodo = {
      ...todoData,
      date: selectedDate.toISOString().split('T')[0] // Add date to todo
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (todoId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  // Filter events for the selected date
  const todaysEvents = events.filter(event => 
    event.date === selectedDate.toISOString().split('T')[0]
  );

  // Filter todos for the selected date
  const todaysTodos = todos.filter(todo => 
    todo.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container"
    >
      <div style={{ padding: '20px' }}>
        <DateHeader 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        
        <div className="schedule-controls" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, color: '#333' }}>Schedule Timeline</h2>
          
          {/* Time/Todo Controls Row */}
          <div className="time-todo-controls" style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#333',
                whiteSpace: 'nowrap'
              }}>
                Time:
              </label>
              <select
                value={todoTimeSlot}
                onChange={(e) => setTodoTimeSlot(parseInt(e.target.value))}
                title="Select the time slot for managing todos"
                style={{
                  padding: '10px 16px',
                  border: '2px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#333',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(240, 147, 251, 0.2)',
                  cursor: 'pointer',
                  minWidth: '120px'
                }}
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i;
                  const formatHour = (h) => {
                    if (h === 0) return '12 AM';
                    if (h < 12) return `${h} AM`;
                    if (h === 12) return '12 PM';
                    return `${h - 12} PM`;
                  };
                  return (
                    <option key={hour} value={hour}>
                      {formatHour(hour)}
                    </option>
                  );
                })}
              </select>
              <button 
                onClick={() => {
                  console.log('Opening todo modal for time slot:', todoTimeSlot);
                  setIsLoadingTodos(true);
                  setTimeout(() => {
                    setShowTodoModal(true);
                    setIsLoadingTodos(false);
                  }, 100);
                }}
                disabled={isLoadingTodos}
                style={{
                  background: isLoadingTodos ? '#ccc' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: isLoadingTodos ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  opacity: isLoadingTodos ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoadingTodos) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(240, 147, 251, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoadingTodos) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.4)';
                  }
                }}
              >
                {isLoadingTodos ? '⏳ Loading...' : '✅ Manage Todos'}
              </button>
            </div>
            
            {/* Add Event Button - will wrap to new line on mobile */}
            <button 
              className="btn btn-primary add-event-btn"
              onClick={() => {
                setEditingEvent(null);
                setSelectedHour(null);
                setShowModal(true);
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              ➕ Add Event
            </button>
          </div>
        </div>

        <TimelineSlots
          events={todaysEvents}
          selectedDate={selectedDate}
          onSlotClick={handleSlotClick}
          onEventEdit={handleEventEdit}
          todos={todaysTodos}
          onTodoClick={handleTodoClick}
          onToggleTodo={toggleTodo}
        />

        {showSlotActionModal && (
          <SlotActionModal
            onClose={handleSlotActionModalClose}
            timeSlot={selectedHour}
            onAddEvent={handleAddEventFromSlot}
            onManageTodos={handleManageTodosFromSlot}
          />
        )}

        {showModal && (
          <AddEventModal
            onClose={handleModalClose}
            onAddEvent={addEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
            selectedDate={selectedDate}
            editingEvent={editingEvent}
            selectedHour={selectedHour}
          />
        )}

        {showTodoModal && (
          <TodoModal
            onClose={handleTodoModalClose}
            timeSlot={todoTimeSlot}
            todos={todaysTodos}
            onAddTodo={addTodo}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </motion.div>
  );
}

export default SchedulePage;
