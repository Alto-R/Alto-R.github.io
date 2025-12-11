// src/App.jsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Resume from './pages/Resume';
import About from './pages/About';
import NavigationTimeline from './components/NavigationTimeline';
import './App.css';

// 页面配置
const sections = [
  { id: 'home', component: Home },
  { id: 'resume', component: Resume },
  { id: 'publications', component: Publications },
  { id: 'about', component: About },
];

function App() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef([]);
  const isScrolling = useRef(false); // 防止滚动时重复触发

  // 监听滚动，更新当前 section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // 找到当前可见的 section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (currentSection !== i) {
            setCurrentSection(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  // 点击导航栏滚动到对应 section
  const scrollToSection = useCallback((index) => {
    setMenuOpen(false);

    const section = sectionRefs.current[index];
    if (!section) return;

    isScrolling.current = true;
    setCurrentSection(index);

    section.scrollIntoView({ behavior: 'smooth' });

    // 滚动完成后重置标志
    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  }, []);

  return (
    <div className="app">
      {/* 左侧导航时间线 */}
      <NavigationTimeline currentSection={currentSection} />

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

        {/* 汉堡菜单按钮 - 仅在移动端显示 */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>

        {/* 导航链接 - 右侧 */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a
            className={currentSection === 0 ? 'active' : ''}
            onClick={() => scrollToSection(0)}
          >
            {t('nav.home')}
          </a>
          <a
            className={currentSection === 1 ? 'active' : ''}
            onClick={() => scrollToSection(1)}
          >
            {t('nav.resume')}
          </a>
          <a
            className={currentSection === 2 ? 'active' : ''}
            onClick={() => scrollToSection(2)}
          >
            {t('nav.publications')}
          </a>
          <a
            className={currentSection === 3 ? 'active' : ''}
            onClick={() => scrollToSection(3)}
          >
            {t('nav.about')}
          </a>
        </div>
      </nav>

      {/* 滚动容器 */}
      <div className="scroll-container">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-section"
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            <section.component onNavigate={scrollToSection} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default App;
