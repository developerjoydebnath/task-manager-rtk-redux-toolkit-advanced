import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componenets/navbar/Navbar';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:taskId" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
