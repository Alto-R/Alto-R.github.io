// src/App.jsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NavigationTimeline from './components/NavigationTimeline';
import PillNav from './components/PillNav';
import Lanyard from './components/Lanyard/Lanyard';
import './App.css';

// 页面配置
const sections = [
  { id: 'home', component: Home },
  { id: 'resume', component: Resume },
  { id: 'publications', component: Publications },
  { id: 'projects', component: Projects },
  { id: 'gallery', component: Gallery },
  { id: 'about', component: About },
];

function App() {
  const { t, i18n } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef([]);
  const isScrolling = useRef(false); // 防止滚动时重复触发
  const currentSectionRef = useRef(0); // 用于在 useEffect 中追踪当前 section

  // 监听滚动，更新当前 section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // 找到当前可见的 section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (currentSectionRef.current !== i) {
            currentSectionRef.current = i;
            setCurrentSection(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击导航栏滚动到对应 section
  const scrollToSection = useCallback((index) => {
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
      <NavigationTimeline currentSection={currentSection} onNavigate={scrollToSection} />

      {/* 顶部导航栏 */}
      <PillNav
        items={[
          { label: t('nav.home') },
          { label: t('nav.resume') },
          { label: t('nav.publications') },
          { label: t('nav.projects') },
          { label: t('nav.gallery') },
          { label: t('nav.about') },
        ]}
        activeIndex={currentSection}
        onItemClick={scrollToSection}
        languageSwitcher={
          <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
            <span
              onClick={() => i18n.changeLanguage('zh')}
              className={`cursor-pointer transition-opacity ${i18n.language === 'zh' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            >
              中文
            </span>
            <span className="text-white/30">|</span>
            <span
              onClick={() => i18n.changeLanguage('en')}
              className={`cursor-pointer transition-opacity ${i18n.language === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            >
              EN
            </span>
          </div>
        }
      />

      {/* 右侧 Lanyard 卡片 - 从 Resume 页面开始显示 */}
      <div className={`lanyard-container ${currentSection >= 1 ? 'visible' : ''}`}>
        {currentSection >= 1 && (
          <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} fov={20} />
        )}
      </div>

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
