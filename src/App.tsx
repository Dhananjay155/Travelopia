import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FlightDetailPage from './pages/FlightDetailPage';
import './App.css'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights/:id" element={<FlightDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
