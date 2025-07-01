import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SchedulePage from './pages/SchedulePage';
import DatePage from './pages/DatePage';
import EventPage from './pages/EventPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SchedulePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/date/:date" element={<DatePage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
