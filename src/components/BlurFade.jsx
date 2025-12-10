import React, { useEffect, useRef, useState } from 'react';
import './BlurFade.css';

export const BlurFade = ({
  children,
  delay = 0,
  inView = false,
  duration = 0.6,
  blur = '6px',
  yOffset = 6
}) => {
  const [isVisible, setIsVisible] = useState(!inView);
  const ref = useRef(null);

  useEffect(() => {
    if (!inView) {
      // 如果不使用inView，直接在delay后显示
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }

    // 使用Intersection Observer检测元素是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, inView]);

  return (
    <div
      ref={ref}
      className={`blur-fade ${isVisible ? 'blur-fade-visible' : ''}`}
      style={{
        '--blur-fade-delay': `${delay}s`,
        '--blur-fade-duration': `${duration}s`,
        '--blur-fade-blur': blur,
        '--blur-fade-y-offset': `${yOffset}px`,
      }}
    >
      {children}
    </div>
  );
};
