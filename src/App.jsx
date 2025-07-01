import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './AnimatedRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
