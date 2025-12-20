import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PillNav = ({
  items,
  activeIndex = 0,
  className = '',
  ease = 'power3.easeOut',
  onItemClick,
  initialLoadAnimation = true,
  languageSwitcher
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pillRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const langRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const layout = () => {
      pillRefs.current.forEach((pill, i) => {
        if (!pill) return;

        const rect = pill.getBoundingClientRect();
        const h = rect.height;

        const label = pill.querySelector('.pill-label');
        const hoverLabel = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        tlRefs.current[i]?.kill();
        const tl = gsap.timeline({ paused: true });

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 20), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[i] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    // 点击外部关闭菜单
    const handleClickOutside = (e) => {
      const menu = mobileMenuRef.current;
      const hamburger = hamburgerRef.current;
      if (menu && hamburger && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        setIsMobileMenuOpen(false);
        // 重置汉堡按钮动画
        const lines = hamburger.querySelectorAll('.hamburger-line');
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
        // 关闭菜单动画
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    };

    document.addEventListener('click', handleClickOutside);

    // 只在首次加载时执行动画
    if (initialLoadAnimation && !hasAnimated.current) {
      hasAnimated.current = true;
      const navItems = navItemsRef.current;
      const lang = langRef.current;

      if (lang) {
        gsap.set(lang, { scale: 0 });
        gsap.to(lang, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const handleItemClick = (index) => {
    setIsMobileMenuOpen(false);
    onItemClick?.(index);
  };

  // 磨砂玻璃效果样式 - 更透明
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
  };

  const pillStyle = {
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    paddingLeft: '16px',
    paddingRight: '16px'
  };

  return (
    <div className="fixed top-[1em] z-[1000] w-full left-0 px-4 md:px-6 flex justify-between items-center">
      {/* 语言切换器 - 左侧 */}
      {languageSwitcher && (
        <div ref={langRef} className="flex items-center">
          {languageSwitcher}
        </div>
      )}
      {/* 占位，确保导航栏在右侧 */}
      {!languageSwitcher && <div />}

      {/* 整体导航栏容器 - 右侧 */}
      <nav
        className={`flex items-center ${className}`}
        aria-label="Primary"
      >
        {/* 导航项容器 (桌面端) - 磨砂玻璃背景 */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex"
          style={{
            height: '44px',
            ...glassStyle
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[4px] h-full"
            style={{ gap: '4px' }}
          >
            {items.map((item, i) => {
              const isActive = activeIndex === i;

              const PillContent = (
                <>
                  <span className="label-stack relative inline-block leading-[1] z-[2] overflow-hidden">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: '#fff',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 w-[6px] h-[6px] rounded-full z-[4]"
                      style={{ background: '#fff' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[14px] leading-[0] uppercase tracking-[0.5px] whitespace-nowrap cursor-pointer border-0';

              return (
                <li key={i} role="none" className="flex h-full">
                  <button
                    role="menuitem"
                    className={basePillClasses}
                    style={pillStyle}
                    aria-label={item.label}
                    ref={el => { pillRefs.current[i] = el; }}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                    onClick={() => handleItemClick(i)}
                  >
                    {PillContent}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 汉堡菜单按钮 (移动端) */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: '44px',
            height: '44px',
            ...glassStyle
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: '#fff' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: '#fff' }}
          />
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3.5em] left-4 right-4 rounded-[20px] z-[998] origin-top"
        style={glassStyle}
      >
        <ul className="list-none m-0 p-[4px] flex flex-col gap-[4px]">
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            const mobileItemStyle = {
              background: isActive ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              transition: 'all 0.2s ease'
            };

            return (
              <li key={i}>
                <button
                  className="w-full text-left py-3 px-4 text-[14px] font-medium rounded-[16px] uppercase tracking-[0.5px] border-0 cursor-pointer"
                  style={mobileItemStyle}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = mobileItemStyle.background;
                  }}
                  onClick={() => handleItemClick(i)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
