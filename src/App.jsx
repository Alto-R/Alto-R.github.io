// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Resume from './pages/Resume';
import About from './pages/About';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <div className="app">
        {/* 顶部导航栏 */}
        <nav className="navbar">
          {/* 语言切换器 - 左侧 */}
          <div className="language-switcher">
            <span
              onClick={() => i18n.changeLanguage('zh')}
              className={i18n.language === 'zh' ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              中文
            </span>
            <span style={{ margin: '0 0.5rem', color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span
              onClick={() => i18n.changeLanguage('en')}
              className={i18n.language === 'en' ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              English
            </span>
          </div>

          {/* 导航链接 - 右侧 */}
          <div className="nav-links">
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/resume">{t('nav.resume')}</Link>
            <Link to="/publications">{t('nav.publications')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
          </div>
        </nav>

        {/* 路由内容区域 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;