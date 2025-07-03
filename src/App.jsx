import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import DatePage from './pages/DatePage';
import EventPage from './pages/EventPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/date/:date" element={<DatePage />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
