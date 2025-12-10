// src/App.jsx
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Resume from './pages/Resume';
import About from './pages/About';
import './App.css';

// 创建语言上下文
export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState('en'); // 'en' 或 'zh'

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <div className="app">
          {/* 顶部导航栏 */}
          <nav className="navbar">
            {/* 语言切换器 - 左侧 */}
            <div className="language-switcher">
              <span
                onClick={() => setLanguage('zh')}
                className={language === 'zh' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                中文
              </span>
              <span style={{ margin: '0 0.5rem', color: 'rgba(255,255,255,0.3)' }}>|</span>
              <span
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                English
              </span>
            </div>

            {/* 导航链接 - 右侧 */}
            <div className="nav-links">
              <Link to="/">{language === 'en' ? 'Home' : '首页'}</Link>
              <Link to="/resume">{language === 'en' ? 'Resume' : '简历'}</Link>
              <Link to="/publications">{language === 'en' ? 'Publications' : '发表论文'}</Link>
              <Link to="/about">{language === 'en' ? 'About' : '关于'}</Link>
            </div>
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
    </LanguageContext.Provider>
  );
}

export default App;