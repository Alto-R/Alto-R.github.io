// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Resume from './pages/Resume';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* 顶部导航栏 */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/publications">Publications</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* 路由内容区域 */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/resume" element={
            <Resume />
          } />
          
          <Route path="/publications" element={
            <Publications />
          } />
          
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;