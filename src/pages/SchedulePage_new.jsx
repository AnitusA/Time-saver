import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DateHeader from '../components/DateHeader';
import TimelineView from '../components/TimelineView';
import AddEventModal from '../components/AddEventModal';

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      date: selectedDate.toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <div style={{ padding: '20px' }}>
        <DateHeader 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ marginBottom: '20px' }}
        >
          Add Event
        </button>

        <TimelineView 
          selectedDate={selectedDate}
          events={events.filter(event => 
            event.date === selectedDate.toISOString().split('T')[0]
          )}
        />

        {showModal && (
          <AddEventModal
            onClose={() => setShowModal(false)}
            onAddEvent={addEvent}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </motion.div>
  );
}

export default SchedulePage;
