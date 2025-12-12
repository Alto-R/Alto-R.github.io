import { useScroll, useTransform, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './NavigationTimeline.css';

const NavigationTimeline = ({ currentSection }) => {
  const { t } = useTranslation();
  const [timelineHeight, setTimelineHeight] = useState(0);

  const sections = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'resume', labelKey: 'nav.resume' },
    { id: 'publications', labelKey: 'nav.publications' },
    { id: 'gallery', labelKey: 'nav.gallery' },
    { id: 'about', labelKey: 'nav.about' },
  ];

  // 计算时间线高度（基于视口高度）
  useEffect(() => {
    const updateHeight = () => {
      setTimelineHeight(window.innerHeight * 0.6); // 60vh
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // 使用 useScroll 获取滚动进度
  const { scrollYProgress } = useScroll();

  // 进度线高度动画（从0到完整高度）
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, timelineHeight]);
  // 透明度动画（开始时淡入）
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="nav-timeline" aria-hidden="true">
      {/* 背景轨道线 - 带渐变遮罩 */}
      <div
        className="nav-timeline-track"
        style={{ height: timelineHeight }}
      >
        {/* 动画进度填充 - 渐变色 */}
        <motion.div
          className="nav-timeline-progress"
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
        />
      </div>

      {/* 节点和标签 */}
      <div className="nav-timeline-dots" style={{ height: timelineHeight }}>
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`nav-timeline-item ${index <= currentSection ? 'active' : ''}`}
          >
            <motion.div
              className="nav-timeline-dot"
              animate={{
                scale: index === currentSection ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* 内圈 */}
              <motion.div
                className="nav-timeline-dot-inner"
                animate={{
                  backgroundColor: index <= currentSection ? '#a5b4fc' : 'rgba(255,255,255,0.2)'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <span className="nav-timeline-label">{t(section.labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationTimeline;
