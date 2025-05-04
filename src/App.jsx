import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';


export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div style={{ marginTop: '60px', padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}