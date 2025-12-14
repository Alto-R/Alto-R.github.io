# 个人网站设计笔记：从零到一的前端开发教学

> 本文档面向不了解前端设计的读者，用通俗易懂的语言讲解网页开发中的设计思路、技术选型和实现技巧。

---

## 目录

### 第一部分：技术实现篇

1. [项目架构概览](#第一章项目架构概览)
2. [组件设计哲学](#第二章组件设计哲学)
3. [色彩体系与视觉设计](#第三章色彩体系与视觉设计)
4. [CSS 高级技巧](#第四章css-高级技巧)
5. [动画效果实现](#第五章动画效果实现)
6. [3D 可视化入门](#第六章3d-可视化入门)
7. [响应式设计实战](#第七章响应式设计实战)
8. [性能优化技巧](#第八章性能优化技巧)
9. [国际化实现](#第九章国际化实现)
10. [小技巧集锦](#第十章小技巧集锦)

### 第二部分：产品设计思维篇

11. [用户画像与使用场景](#第十一章用户画像与使用场景分析)
12. [设计语言与视觉风格](#第十二章设计语言与视觉风格)
13. [交互设计决策](#第十三章交互设计决策)
14. [信息架构设计](#第十四章信息架构设计)
15. [可用性与无障碍设计](#第十五章可用性与无障碍设计)

### 第三部分：细节中的产品智慧

16. [微交互设计的产品价值](#第十六章微交互设计的产品价值)
17. [防御性设计与容错机制](#第十七章防御性设计与容错机制)
18. [性能感知优化](#第十八章性能感知优化)
19. [视觉一致性系统](#第十九章视觉一致性系统)
20. [数据结构的产品思维](#第二十章数据结构的产品思维)

---

## 第一章：项目架构概览

### 1.1 什么是项目架构？

项目架构就像盖房子的蓝图。在开始写代码之前，我们需要规划好：
- 文件放在哪里？
- 用什么技术？
- 各部分如何协作？

### 1.2 目录结构

```
my-personalweb/
├── src/                      # 源代码目录（我们写的代码都在这里）
│   ├── pages/                # 页面组件（每个页面一个文件）
│   │   ├── Home.jsx          # 首页（3D粒子城市）
│   │   ├── Resume.jsx        # 简历页
│   │   ├── Publications.jsx  # 论文页
│   │   ├── Gallery.jsx       # 画廊页
│   │   └── About.jsx         # 关于页
│   │
│   ├── components/           # 可复用组件（多个页面都能用的积木）
│   │   ├── BlurFade.jsx      # 模糊淡入动画
│   │   ├── Dock.jsx          # 底部悬浮菜单
│   │   ├── NavigationTimeline.jsx  # 左侧导航时间线
│   │   └── ParticlesCityReal.jsx   # 3D粒子城市
│   │
│   ├── hooks/                # 自定义 Hook（可复用的逻辑）
│   │   └── useOutsideClick.js
│   │
│   ├── data/                 # 数据文件
│   │   └── galleryData.js    # 图片配置
│   │
│   ├── locales/              # 多语言文件
│   │   ├── en.json           # 英文
│   │   └── zh.json           # 中文
│   │
│   ├── App.jsx               # 主应用（入口）
│   ├── App.css               # 全局样式
│   └── i18n.js               # 国际化配置
│
├── public/                   # 静态资源（图片、字体等）
├── package.json              # 项目配置和依赖
└── vite.config.js            # 构建工具配置
```

**设计思路**：
- `pages/` 放页面级组件，每个页面独立
- `components/` 放可复用组件，像乐高积木一样可以拼装
- `hooks/` 放可复用的逻辑，避免重复代码
- `data/` 放配置数据，方便修改

### 1.3 技术栈选择

| 技术 | 用途 | 为什么选它？ |
|------|------|-------------|
| React 19 | UI 框架 | 组件化开发，生态丰富 |
| Vite | 构建工具 | 启动快，热更新快 |
| Tailwind CSS | 样式框架 | 原子化 CSS，快速开发 |
| Three.js | 3D 渲染 | WebGL 封装，简化 3D 开发 |
| Framer Motion | 动画库 | 声明式动画，易于使用 |
| i18next | 国际化 | 成熟的多语言解决方案 |

### 1.4 单页应用的滚动路由设计

传统网站每个页面是独立的 HTML 文件，点击链接会重新加载。而**单页应用（SPA）**只有一个 HTML 文件，所有内容通过 JavaScript 动态渲染。

本项目采用**滚动路由**设计：所有页面在同一个长页面上，通过滚动切换。

```javascript
// src/App.jsx - 页面配置
const sections = [
  { id: 'home', component: Home },
  { id: 'resume', component: Resume },
  { id: 'publications', component: Publications },
  { id: 'gallery', component: Gallery },
  { id: 'about', component: About },
];
```

**核心逻辑：滚动到指定位置**

```javascript
// 点击导航栏，平滑滚动到对应页面
const scrollToSection = useCallback((index) => {
  setMenuOpen(false);  // 关闭移动端菜单

  const section = sectionRefs.current[index];
  if (!section) return;

  isScrolling.current = true;      // 设置标志，防止滚动时重复触发
  setCurrentSection(index);        // 更新当前页面状态

  section.scrollIntoView({ behavior: 'smooth' });  // 平滑滚动

  // 滚动完成后重置标志（800ms 是滚动动画的大致时间）
  setTimeout(() => {
    isScrolling.current = false;
  }, 800);
}, []);
```

**为什么用 `isScrolling` 标志？**

当用户点击导航栏时，页面会滚动。滚动过程中会触发 `scroll` 事件，如果不加控制，可能导致：
1. 状态频繁更新
2. 动画卡顿

使用 `isScrolling` 标志，在滚动期间忽略 `scroll` 事件，滚动完成后再恢复。

> **小贴士**：`useCallback` 是 React 的 Hook，用于缓存函数，避免每次渲染都创建新函数。

---

## 第二章：组件设计哲学

### 2.1 什么是组件？

组件是 React 的核心概念。你可以把组件想象成**乐高积木**：
- 每个积木有特定的形状和功能
- 积木可以组合成更大的结构
- 同一个积木可以用在不同地方

### 2.2 组件分类

本项目中的组件分为两类：

**页面组件（Pages）**：
- 位于 `src/pages/`
- 代表完整的页面
- 通常只使用一次
- 例如：`Home.jsx`、`Resume.jsx`

**可复用组件（Components）**：
- 位于 `src/components/`
- 可以在多个地方使用
- 通过 Props 接收不同的配置
- 例如：`BlurFade.jsx`、`Dock.jsx`

### 2.3 Props 设计：如何让组件灵活？

Props（属性）是组件的输入参数。好的 Props 设计让组件既灵活又易用。

**案例：BlurFade 组件**

```javascript
// src/components/BlurFade.jsx
export const BlurFade = ({
  children,          // 子元素（必需）
  delay = 0,         // 延迟时间，默认 0 秒
  inView = false,    // 是否等待进入视口才触发，默认否
  duration = 0.6,    // 动画时长，默认 0.6 秒
  blur = '6px',      // 模糊程度，默认 6px
  yOffset = 6        // 垂直偏移，默认 6px
}) => {
  // 组件实现...
};
```

**设计原则**：
1. **合理的默认值**：大多数情况下不需要传参就能用
2. **可定制**：需要时可以覆盖默认值
3. **语义化命名**：参数名一看就懂

**使用示例**：

```jsx
// 最简单的用法（使用所有默认值）
<BlurFade>
  <h1>Hello World</h1>
</BlurFade>

// 自定义延迟和模糊程度
<BlurFade delay={0.5} blur="10px">
  <p>这段文字会在 0.5 秒后出现</p>
</BlurFade>

// 滚动到视口才触发
<BlurFade inView delay={0.25}>
  <div>滚动到这里才会显示</div>
</BlurFade>
```

### 2.4 状态管理：数据放在哪里？

React 组件有两种数据：
- **Props**：从父组件传入，只读
- **State**：组件内部状态，可修改

**状态放在哪里的原则**：

1. **局部状态**：只有当前组件用，放在组件内部
2. **共享状态**：多个组件需要，提升到共同的父组件

**案例：Publications 页面的状态**

```javascript
// src/pages/Publications.jsx
const Publications = () => {
  // activeId 只有 Publications 页面用，所以放在这里
  const [activeId, setActiveId] = useState(null);

  // ...
};
```

**案例：App.jsx 的共享状态**

```javascript
// src/App.jsx
function App() {
  // currentSection 需要传给 NavigationTimeline，所以放在 App 里
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div className="app">
      <NavigationTimeline currentSection={currentSection} />
      {/* ... */}
    </div>
  );
}
```

> **小贴士**：不要过早优化。先把状态放在需要的地方，等需要共享时再提升。

---

## 第三章：色彩体系与视觉设计

### 3.1 主色调的选择

本项目采用**深色主题**，主要颜色：

| 颜色 | 色值 | 用途 |
|------|------|------|
| 主色 | `#a5b4fc` | 强调色、链接、标题 |
| 背景 | `#050505` | 页面背景 |
| 文字 | `#ffffff` | 主要文字 |
| 次要文字 | `rgba(255,255,255,0.7)` | 辅助文字 |
| 边框 | `rgba(255,255,255,0.1)` | 分割线、边框 |

**为什么选择这些颜色？**

1. **深色背景**：减少视觉疲劳，突出内容
2. **蓝紫主色**：科技感、现代感
3. **透明度**：创造层次感，避免生硬

### 3.2 渐变色的运用

渐变色可以让界面更有层次感和动感。

**案例：导航时间线的进度条**

```css
/* src/components/NavigationTimeline.css */
.nav-timeline-progress {
  /* 从上到下：透明 -> 蓝色 -> 紫色 */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    #3b82f6 10%,    /* 蓝色 */
    #8b5cf6 50%,    /* 紫色 */
    #a855f7 100%    /* 粉紫色 */
  );
}
```

### 3.3 3D 粒子城市的分层配色

3D 粒子城市是首页的亮点。为了让城市有层次感，我们根据建筑高度分配不同颜色：

```javascript
// src/components/ParticlesCityReal.jsx
// 5 层颜色，从低到高
const colorDeep = new THREE.Color('#000510');  // 底部：极深蓝黑
const colorBase = new THREE.Color('#1e3a8a');  // 低层：深宝石蓝
const colorMid = new THREE.Color('#15c9d3');   // 中层：电光青
const colorHigh = new THREE.Color('#bd00ff');  // 高层：极光紫
const colorTop = new THREE.Color('#ffffff');   // 顶端：纯白

// 根据高度计算颜色
const hScale = Math.min(y / 25, 1);  // 归一化高度（0-1）

if (hScale < 0.1) {
  // 0-10%：极深蓝黑 -> 深宝石蓝
  tempColor.lerpColors(colorDeep, colorBase, hScale / 0.1);
} else if (hScale < 0.45) {
  // 10-45%：深宝石蓝 -> 电光青
  tempColor.lerpColors(colorBase, colorMid, (hScale - 0.1) / 0.35);
} else if (hScale < 0.85) {
  // 45-85%：电光青 -> 极光紫
  tempColor.lerpColors(colorMid, colorHigh, (hScale - 0.45) / 0.5);
} else {
  // 85-100%：极光紫 -> 纯白
  tempColor.lerpColors(colorHigh, colorTop, (hScale - 0.85) / 0.05);
}
```

**设计思路**：
- 底部暗，顶部亮，形成向上的视觉引导
- 中间层占比最大（电光青到极光紫），是主要视觉区域
- 顶端极少量纯白，像建筑顶部的灯光

> **小贴士**：`lerpColors` 是线性插值函数，用于在两个颜色之间平滑过渡。

---

## 第四章：CSS 高级技巧

### 4.1 毛玻璃效果（Glassmorphism）

毛玻璃效果让元素看起来像磨砂玻璃，透过它可以模糊地看到背景。

```css
/* src/components/Dock.css */
.dock {
  background: rgba(255, 255, 255, 0.05);  /* 半透明背景 */
  backdrop-filter: blur(10px);             /* 背景模糊 */
  border: 1px solid rgba(255, 255, 255, 0.1);  /* 淡边框 */
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

**关键属性**：
- `backdrop-filter: blur()` - 模糊背景
- 半透明背景色 - 让模糊效果可见
- 淡色边框 - 增加边缘感

### 4.2 渐变遮罩技巧

渐变遮罩可以让元素的边缘自然淡出，非常适合做进度条、时间线等效果。

```css
/* src/components/NavigationTimeline.css */
.nav-timeline-track {
  /* 背景：上下透明，中间可见 */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 10%,
    rgba(255, 255, 255, 0.15) 90%,
    transparent 100%
  );

  /* 遮罩：让上下边缘淡出 */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}
```

**原理**：
- `mask-image` 定义哪些部分可见
- `black` 表示完全可见，`transparent` 表示完全透明
- 通过渐变，实现边缘的平滑过渡

### 4.3 CSS 变量的使用

CSS 变量让样式更灵活，可以在 JavaScript 中动态修改。

```css
/* src/components/BlurFade.css */
.blur-fade {
  opacity: 0;
  filter: blur(var(--blur-fade-blur, 6px));      /* 使用变量，默认 6px */
  transform: translateY(var(--blur-fade-y-offset, 6px));
  transition:
    opacity var(--blur-fade-duration, 0.6s) ease-out,
    filter var(--blur-fade-duration, 0.6s) ease-out,
    transform var(--blur-fade-duration, 0.6s) ease-out;
}
```

```jsx
// 在组件中设置变量
<div
  className="blur-fade"
  style={{
    '--blur-fade-delay': `${delay}s`,
    '--blur-fade-duration': `${duration}s`,
    '--blur-fade-blur': blur,
    '--blur-fade-y-offset': `${yOffset}px`,
  }}
>
  {children}
</div>
```

**好处**：
- 样式逻辑在 CSS 中，组件只需设置变量值
- 复用性强，同一套 CSS 适应不同配置

### 4.4 悬停效果链

好的悬停效果应该是多个属性协同变化，而不是单一变化。

```css
/* src/App.css */
.pub-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.pub-card:hover {
  transform: translateY(-5px);                    /* 上浮 */
  background: rgba(255, 255, 255, 0.08);          /* 背景变亮 */
  border-color: rgba(165, 180, 252, 0.5);         /* 边框变蓝 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);     /* 阴影加深 */
}
```

**效果链条**：
1. 上浮（transform）- 提升感
2. 背景变亮 - 聚焦感
3. 边框变蓝 - 强调色
4. 阴影加深 - 立体感

### 4.5 自定义滚动条

默认滚动条通常很丑，自定义滚动条让界面更协调。

```css
/* 针对特定元素的滚动条 */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(165, 180, 252, 0.3);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(165, 180, 252, 0.5);
}
```

> **注意**：`::-webkit-scrollbar` 是非标准属性，主要支持 Chrome、Edge、Safari。Firefox 使用 `scrollbar-width` 和 `scrollbar-color`。

---

## 第五章：动画效果实现

### 5.1 BlurFade：模糊淡入动画

这是项目中最常用的动画组件，让元素带着模糊效果淡入。

**完整实现**：

```javascript
// src/components/BlurFade.jsx
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
      // 不使用 inView 时，直接在 delay 后显示
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }

    // 使用 Intersection Observer 检测元素是否进入视口
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
      { threshold: 0.1 }  // 元素 10% 可见时触发
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
        '--blur-fade-duration': `${duration}s`,
        '--blur-fade-blur': blur,
        '--blur-fade-y-offset': `${yOffset}px`,
      }}
    >
      {children}
    </div>
  );
};
```

**配套 CSS**：

```css
/* src/components/BlurFade.css */
.blur-fade {
  opacity: 0;
  filter: blur(var(--blur-fade-blur, 6px));
  transform: translateY(var(--blur-fade-y-offset, 6px));
  transition:
    opacity var(--blur-fade-duration, 0.6s) ease-out,
    filter var(--blur-fade-duration, 0.6s) ease-out,
    transform var(--blur-fade-duration, 0.6s) ease-out;
}

.blur-fade-visible {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
```

**核心技术：Intersection Observer**

Intersection Observer 是浏览器 API，用于检测元素是否进入视口。相比监听 scroll 事件，它更高效。

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 元素进入视口了！
      }
    });
  },
  { threshold: 0.1 }  // 可见比例阈值
);

observer.observe(element);  // 开始观察
observer.unobserve(element);  // 停止观察
```

### 5.2 EncryptedText：加密解密文字效果

这个效果让文字看起来像在被解密，非常酷炫。

**核心逻辑**：

```javascript
// src/components/encrypted-text.jsx
const CYCLES_PER_LETTER = 2;  // 每个字母解密需要的循环次数
const SHUFFLE_TIME = 50;       // 每次循环的间隔（毫秒）
const CHARS = "!@#$%^&*():{};|,.<>/?";  // 随机字符池

const scramble = () => {
  let pos = 0;

  scrambleIntervalRef.current = setInterval(() => {
    const scrambled = text
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";  // 空格保持不变

        // 已经解密的字符显示原文
        if (pos / CYCLES_PER_LETTER > index) {
          return char;
        }

        // 未解密的字符显示随机字符
        const randomCharIndex = Math.floor(Math.random() * CHARS.length);
        return CHARS[randomCharIndex];
      })
      .join("");

    setDisplayText(scrambled);
    pos++;

    // 全部解密完成
    if (pos >= text.length * CYCLES_PER_LETTER) {
      stopScramble();
    }
  }, encryptSpeed);
};
```

**效果原理**：
1. 初始状态：所有字符显示为随机符号
2. 随时间推移，从左到右逐个字符恢复原文
3. 每个字符需要 `CYCLES_PER_LETTER` 次循环才能恢复

### 5.3 Framer Motion layoutId：平滑展开动画

Framer Motion 的 `layoutId` 是实现平滑过渡动画的神器。

**使用场景**：点击卡片展开为弹窗

```jsx
// src/pages/Publications.jsx

// 卡片列表
{publications.map((pub) => (
  <motion.div
    key={pub.id}
    layoutId={`card-${pub.id}`}  // 关键：给相同元素相同的 layoutId
    onClick={() => setActiveId(pub.id)}
    className="pub-card"
  >
    <motion.h2 layoutId={`title-${pub.id}`}>
      {pub.title}
    </motion.h2>
    <motion.p layoutId={`authors-${pub.id}`}>
      {pub.authors}
    </motion.p>
  </motion.div>
))}

// 展开后的弹窗
<AnimatePresence>
  {activeId && (
    <motion.div
      layoutId={`card-${activeId}`}  // 相同的 layoutId
      className="modal-content"
    >
      <motion.h2 layoutId={`title-${activeId}`}>
        {activePub.title}
      </motion.h2>
      <motion.p layoutId={`authors-${activeId}`}>
        {activePub.authors}
      </motion.p>
      {/* 更多内容... */}
    </motion.div>
  )}
</AnimatePresence>
```

**原理**：
- 相同 `layoutId` 的元素会自动进行位置和大小的过渡动画
- Framer Motion 计算两个状态之间的差异，自动生成补间动画
- `AnimatePresence` 让元素退出时也有动画

> **小贴士**：`layoutId` 必须全局唯一，建议用 `${类型}-${id}` 的格式。

---

## 第六章：3D 可视化入门

### 6.1 Three.js 与 React Three Fiber

Three.js 是一个 3D 库，但直接使用比较繁琐。React Three Fiber 将 Three.js 封装为 React 组件，更易用。

**基础结构**：

```jsx
// src/pages/Home.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Home = () => {
  return (
    <div className="home-container">
      {/* Canvas 是 3D 场景的容器 */}
      <Canvas dpr={[1, 2]}>
        {/* 相机：决定从哪个角度看 */}
        <PerspectiveCamera
          makeDefault
          position={[-180, 60, 30]}  // 相机位置
          fov={60}                    // 视野角度
        />

        {/* 光源 */}
        <ambientLight intensity={0.5} />

        {/* 雾气效果 */}
        <fog attach="fog" args={['#050505', 300, 600]} />

        {/* 3D 物体 */}
        <ParticlesCityReal />

        {/* 轨道控制器：允许用户旋转视角 */}
        <OrbitControls
          enableZoom={false}      // 禁用缩放
          enablePan={false}       // 禁用平移
          autoRotate={true}       // 自动旋转
          autoRotateSpeed={0.1}   // 旋转速度
          minPolarAngle={Math.PI / 6}   // 最小仰角
          maxPolarAngle={Math.PI / 2.2} // 最大仰角
        />
      </Canvas>
    </div>
  );
};
```

### 6.2 Canvas 与 HTML 分层设计

3D 场景和 HTML 内容需要分层显示：

```jsx
<div className="home-container">
  {/* 底层：3D 场景 */}
  <div className="canvas-container">
    <Canvas>...</Canvas>
  </div>

  {/* 上层：HTML 内容 */}
  <div className="hero-overlay">
    <div className="hero-content">
      <h1>Hello World</h1>
    </div>
  </div>
</div>
```

```css
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;  /* 底层 */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;  /* 上层 */
  pointer-events: none;  /* 允许点击穿透到 3D 场景 */
}

.hero-content {
  pointer-events: auto;  /* 内容区域恢复点击 */
}
```

### 6.3 GPU Shader 基础

Shader 是运行在 GPU 上的程序，用于计算每个顶点和像素的位置、颜色。

**两种 Shader**：
- **Vertex Shader（顶点着色器）**：处理顶点位置
- **Fragment Shader（片段着色器）**：处理像素颜色

```javascript
// src/components/ParticlesCityReal.jsx

// 顶点着色器：计算粒子位置
const vertexShader = `
  uniform float uProgress;  // 动画进度（0-2）
  attribute vec3 color;     // 粒子颜色
  varying vec3 vColor;      // 传给片段着色器

  void main() {
    vColor = color;
    vec3 pos = position;

    if (uProgress > 0.0) {
      // 爆开方向
      vec3 explosionDir = vec3(position.x * 2.0, position.y * 2.0 + 20.0, position.z * 2.0);

      float t;
      float ease;

      if (uProgress <= 1.0) {
        // 阶段1：爆开（easeOut 缓动）
        t = uProgress;
        ease = 1.0 - pow(1.0 - t, 3.0);
        pos = position + explosionDir * ease;
      } else {
        // 阶段2：聚拢（easeIn 缓动）
        t = uProgress - 1.0;
        ease = pow(t, 3.0);
        pos = position + explosionDir * (1.0 - ease);
      }
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 根据距离调整点大小（近大远小）
    gl_PointSize = 1.5 * (300.0 / -mvPosition.z);
  }
`;

// 片段着色器：设置颜色
const fragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 0.8);  // RGBA，80% 不透明度
  }
`;
```

**为什么用 Shader？**

如果用 JavaScript 逐个更新几万个粒子的位置，CPU 会很吃力。而 Shader 在 GPU 上并行计算，效率极高。

### 6.4 区分点击和拖动

在 3D 场景中，用户可能想拖动旋转视角，也可能想点击触发动画。我们需要区分这两种操作：

```javascript
// src/components/ParticlesCityReal.jsx
const mouseDownPos = useRef({ x: 0, y: 0 });
const isDragging = useRef(false);

const handlePointerDown = (e) => {
  // 记录鼠标按下位置
  mouseDownPos.current = { x: e.clientX, y: e.clientY };
  isDragging.current = false;
};

const handlePointerMove = (e) => {
  // 如果移动超过 5px，认为是拖动
  const dx = e.clientX - mouseDownPos.current.x;
  const dy = e.clientY - mouseDownPos.current.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    isDragging.current = true;
  }
};

const handlePointerUp = () => {
  // 只有不是拖动时才触发点击
  if (!isDragging.current && !exploding) {
    setExploding(true);
  }
};
```

**逻辑**：
1. 记录鼠标按下的位置
2. 移动时检查移动距离
3. 移动超过 5px 就认为是拖动，否则是点击

---

## 第七章：响应式设计实战

### 7.1 什么是响应式设计？

响应式设计让网页在不同设备上都能良好显示：手机、平板、电脑。

### 7.2 三层断点策略

本项目使用三个断点：

| 断点 | 设备 | 主要变化 |
|------|------|---------|
| > 768px | 桌面 | 完整布局 |
| ≤ 768px | 平板 | 单列布局、汉堡菜单 |
| ≤ 480px | 手机 | 进一步简化 |

```css
/* 桌面端样式（默认） */
.navbar {
  padding: 1.5rem 2rem;
}

/* 平板端 */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }

  .menu-toggle {
    display: flex;  /* 显示汉堡菜单 */
  }

  .nav-links {
    position: fixed;
    right: -100%;  /* 默认隐藏在右侧 */
    /* ... */
  }

  .nav-links.active {
    right: 0;  /* 打开时滑入 */
  }
}

/* 手机端 */
@media (max-width: 480px) {
  .navbar {
    padding: 0.8rem 1rem;
  }

  h1 {
    font-size: 2rem;  /* 更小的标题 */
  }
}
```

### 7.3 汉堡菜单动画

汉堡菜单是移动端常见的导航模式，三条横线变成叉叉：

```css
/* src/App.css */
.menu-toggle {
  display: none;  /* 桌面端隐藏 */
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  width: 30px;
  height: 3px;
  background: #a5b4fc;
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* 打开状态：变成叉叉 */
.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.menu-toggle span.open:nth-child(2) {
  opacity: 0;  /* 中间那条消失 */
}

.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}
```

### 7.4 时间线的响应式处理

左侧导航时间线在不同屏幕上有不同的显示：

```css
/* src/components/NavigationTimeline.css */

/* 桌面端：完整显示 */
.nav-timeline-label {
  font-size: 1.1rem;
}

/* 平板端：隐藏文字 */
@media (max-width: 768px) {
  .nav-timeline {
    left: 16px;  /* 更靠近边缘 */
  }

  .nav-timeline-label {
    display: none;  /* 隐藏文字标签 */
  }

  .nav-timeline-dot {
    width: 10px;  /* 更小的圆点 */
    height: 10px;
  }
}

/* 手机端：进一步缩小 */
@media (max-width: 480px) {
  .nav-timeline {
    left: 10px;
  }

  .nav-timeline-dot {
    width: 8px;
    height: 8px;
  }
}
```

### 7.5 触摸设备优化

触摸设备有特殊的交互需求：

```css
/* src/App.css */
@media (hover: none) and (pointer: coarse) {
  /* 增加触摸目标大小（iOS 推荐最小 44px） */
  .navbar a,
  .language-switcher span,
  .menu-toggle {
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  /* 添加点击高亮 */
  .pub-card,
  .contact-link {
    -webkit-tap-highlight-color: rgba(165, 180, 252, 0.2);
  }
}
```

**触摸设备特点**：
- 没有 hover 状态
- 需要更大的触摸目标
- 需要点击反馈

> **小贴士**：`@media (hover: none)` 检测设备是否支持 hover，触摸设备通常不支持。

---

## 第八章：性能优化技巧

### 8.1 图片懒加载与 CDN 优化

图片是网页中最大的资源。本项目使用 Cloudinary CDN，并自动优化图片：

```javascript
// src/data/galleryData.js
export const cloudinaryConfig = {
  cloudName: 'dj5oohbni',
};

export const getCloudinaryUrl = (publicId, type = 'thumb') => {
  if (type === 'thumb') {
    // 缩略图：宽度 400px，自动格式和压缩
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto,w_400/${publicId}`;
  } else {
    // 高清图：宽度 1600px
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto,w_1600/${publicId}`;
  }
};
```

**优化参数**：
- `f_auto`：自动选择最佳格式（WebP、AVIF）
- `q_auto`：自动压缩质量
- `w_400` / `w_1600`：限制宽度

**效果**：原图 5MB → 优化后 200KB，体积减少 96%！

### 8.2 React.memo 与自定义对比函数

React 默认每次父组件更新，子组件都会重新渲染。`React.memo` 可以避免不必要的渲染：

```javascript
// src/components/layout-grid.jsx
const GridCard = memo(({ card, isSelected, isLastSelected, onClick }) => {
  return (
    <div className={cn(card.className, "relative")}>
      {/* ... */}
    </div>
  );
}, (prevProps, nextProps) => {
  // 自定义对比函数：只有这些属性变化时才重新渲染
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isLastSelected === nextProps.isLastSelected &&
    prevProps.card.id === nextProps.card.id
  );
});
```

**工作原理**：
- `memo` 会记住组件的上一次渲染结果
- 只有 props 变化时才重新渲染
- 自定义对比函数可以更精确控制

### 8.3 useCallback 优化事件处理

每次渲染都创建新函数会导致子组件不必要的更新：

```javascript
// ❌ 不好：每次渲染都创建新函数
const handleClick = (card) => {
  setLastSelected(selected);
  setSelected(card);
};

// ✅ 好：用 useCallback 缓存函数
const handleClick = useCallback((card) => {
  setLastSelected(selected);
  setSelected(card);
}, [selected]);
```

### 8.4 事件监听器的 passive 选项

滚动事件默认会阻塞页面滚动，直到事件处理完成。`passive: true` 告诉浏览器不会调用 `preventDefault()`，可以立即滚动：

```javascript
// src/App.jsx
useEffect(() => {
  const handleScroll = () => {
    // ...
  };

  // passive: true 提升滚动性能
  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 8.5 防抖处理

高频事件（如滚动）如果每次都处理，会很耗性能。防抖是只处理最后一次：

```javascript
// src/App.jsx
const isScrolling = useRef(false);

const scrollToSection = useCallback((index) => {
  isScrolling.current = true;  // 开始滚动

  section.scrollIntoView({ behavior: 'smooth' });

  // 滚动完成后重置
  setTimeout(() => {
    isScrolling.current = false;
  }, 800);
}, []);

// 滚动事件处理
const handleScroll = () => {
  if (isScrolling.current) return;  // 正在滚动时忽略
  // ...
};
```

---

## 第九章：国际化实现

### 9.1 i18next 配置

i18next 是 React 最流行的国际化库。

```javascript
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

// 从 localStorage 读取语言偏好
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation }
    },
    lng: savedLanguage,      // 初始语言
    fallbackLng: 'en',       // 回退语言
    interpolation: {
      escapeValue: false     // React 已处理 XSS
    }
  });

// 语言变化时保存到 localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
```

### 9.2 翻译文件结构

翻译文件是 JSON 格式，支持嵌套结构：

```json
// src/locales/zh.json
{
  "nav": {
    "home": "首页",
    "resume": "简历",
    "publications": "论文",
    "gallery": "画廊",
    "about": "关于"
  },
  "home": {
    "greeting": "你好，我是 Alto",
    "subtitle": "北京大学 | 信息管理与信息系统",
    "button": "了解更多"
  }
}
```

### 9.3 在组件中使用

```jsx
// 任意组件中
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      {/* t() 函数获取翻译 */}
      <h1>{t('home.greeting')}</h1>

      {/* 切换语言 */}
      <button onClick={() => i18n.changeLanguage('zh')}>中文</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  );
};
```

### 9.4 语言切换器实现

```jsx
// src/App.jsx
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
```

### 9.5 动态内容的语言同步

当图片标题等内容有多语言版本时，需要在语言切换时同步更新：

```javascript
// src/data/galleryData.js
export const galleryImages = [
  {
    id: 1,
    title: { zh: "北京的春", en: "Spring in Beijing" },
    // ...
  }
];

// 辅助函数：根据语言获取文本
export const getLocalizedText = (textObj, locale = 'zh') => {
  if (typeof textObj === 'string') return textObj;
  return textObj[locale] || textObj.zh || '';
};
```

```jsx
// 使用时
import { useTranslation } from 'react-i18next';
import { getLocalizedText } from '../data/galleryData';

const Gallery = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      {images.map(img => (
        <div key={img.id}>
          <h3>{getLocalizedText(img.title, i18n.language)}</h3>
        </div>
      ))}
    </div>
  );
};
```

---

## 第十章：小技巧集锦

### 10.1 滚动驱动导航

根据滚动位置自动高亮当前页面的导航项：

```javascript
// src/App.jsx
useEffect(() => {
  const handleScroll = () => {
    if (isScrolling.current) return;

    // 当前滚动位置 + 1/3 视口高度
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // 从下往上找，找到第一个顶部在滚动位置之上的 section
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
```

**为什么加 1/3 视口高度？**

如果只看滚动位置是否到达 section 顶部，用户需要滚动到 section 完全出现才会切换。加上 1/3 视口高度，让切换更早、更自然。

### 10.2 外部点击检测 Hook

点击弹窗外部关闭弹窗是常见需求，封装成 Hook 可以复用：

```javascript
// src/hooks/useOutsideClick.js
import { useEffect } from 'react';

export const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // 如果点击的是 ref 元素或其子元素，不处理
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    // 同时监听鼠标和触摸事件
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
```

**使用方式**：

```jsx
const modalRef = useRef(null);
useOutsideClick(modalRef, () => setActiveId(null));

return (
  <div ref={modalRef} className="modal">
    {/* 点击这个 div 外部会触发关闭 */}
  </div>
);
```

### 10.3 ESC 键关闭弹窗

用户习惯按 ESC 关闭弹窗：

```javascript
// src/pages/Publications.jsx
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setActiveId(null);
    }
  };

  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, []);
```

### 10.4 防止背景滚动

弹窗打开时，背景不应该能滚动：

```javascript
// src/pages/Publications.jsx
useEffect(() => {
  if (activeId) {
    document.body.style.overflow = 'hidden';  // 禁止滚动
  } else {
    document.body.style.overflow = 'auto';    // 恢复滚动
  }

  // 清理函数：组件卸载时恢复
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [activeId]);
```

### 10.5 区分点击和拖动（完整版）

```javascript
const mouseDownPos = useRef({ x: 0, y: 0 });
const isDragging = useRef(false);

const handlePointerDown = (e) => {
  mouseDownPos.current = { x: e.clientX, y: e.clientY };
  isDragging.current = false;
};

const handlePointerMove = (e) => {
  const dx = e.clientX - mouseDownPos.current.x;
  const dy = e.clientY - mouseDownPos.current.y;
  // 移动超过 5px 认为是拖动
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    isDragging.current = true;
  }
};

const handlePointerUp = () => {
  if (!isDragging.current) {
    // 这是点击！
    handleClick();
  }
};
```

### 10.6 渐进式图片加载

先显示模糊的缩略图，再加载高清图：

```jsx
// src/components/layout-grid.jsx
const BlurImage = memo(({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={card.thumbnail}
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition duration-200",
        loaded ? "blur-none" : "blur-md"  // 未加载完显示模糊
      )}
      loading="lazy"  // 原生懒加载
    />
  );
});
```

**效果**：用户先看到模糊图片（加载快），再逐渐变清晰，体验更好。

---

# 第二部分：产品设计思维篇

> 技术是手段，设计是目的。这一部分从产品设计的角度，解释每个技术决策背后的"为什么"。

---

## 第十一章：用户画像与使用场景分析

### 11.1 目标用户是谁？

在设计网站之前，首先要明确：**谁会来访问这个网站？**

本项目的目标用户画像：

| 用户类型 | 特征 | 核心需求 | 访问频率 |
|---------|------|---------|---------|
| **学术界同行** | 研究人员、博士生 | 了解研究方向、查看论文 | 低频但深度 |
| **潜在雇主/HR** | 企业招聘人员 | 快速评估能力、获取联系方式 | 一次性访问 |
| **合作伙伴** | 项目合作者、导师 | 了解背景、建立联系 | 中频 |
| **同学/朋友** | 熟人社交 | 欣赏作品、了解近况 | 随机 |

**设计启示**：

1. **第一印象至关重要**
   - HR 可能只看 30 秒就决定是否继续
   - 首页必须在几秒内传达"这个人是谁、做什么"

2. **信息层次要清晰**
   - 不同用户关心的内容不同
   - 学术同行关心论文，HR 关心经历
   - 需要让每类用户都能快速找到所需

3. **专业性与个性并重**
   - 太正式会显得无趣
   - 太随意会显得不专业
   - 3D 粒子城市是平衡点：酷炫但不轻浮

### 11.2 用户访问场景

用户在什么情况下会访问这个网站？

**场景一：快速筛选（30秒-2分钟）**
- HR 收到简历，点开个人网站链接
- 需求：快速判断是否值得深入了解
- 设计对策：
  - 首页直接展示核心信息（姓名、学校、方向）
  - 导航栏清晰，一眼看到所有板块
  - 不需要注册、登录等障碍

**场景二：深度了解（5-15分钟）**
- 面试前详细了解候选人
- 需求：看简历、论文、项目经历
- 设计对策：
  - Resume 页面结构清晰，时间线呈现
  - Publications 支持展开查看摘要
  - 内容详实但不冗长

**场景三：休闲浏览（时间不定）**
- 朋友分享的链接，随便看看
- 需求：有趣、好看
- 设计对策：
  - 3D 粒子城市提供视觉惊喜
  - Gallery 展示摄影作品
  - 动画效果增加趣味性

### 11.3 设备分布考量

用户用什么设备访问？

**预期分布**：
- 桌面端：70%（主要场景是工作/学习时查看）
- 移动端：25%（社交分享、随手查看）
- 平板：5%

**设计策略**：

```
桌面优先，移动适配
├── 桌面端：完整体验，3D 效果全开
├── 平板端：简化导航，保留核心功能
└── 移动端：精简布局，确保可用性
```

**为什么不是移动优先？**

移动优先适合面向大众的产品（电商、社交）。而个人学术网站的主要访问场景是：
- HR 在电脑上筛选简历
- 研究人员在办公室查阅
- 这些场景桌面端占绝对主导

### 11.4 用户核心需求金字塔

```
              △ 惊喜层
             /  \    "这个网站好酷！"（3D效果、动画）
            /    \
           /──────\  期望层
          /        \    "内容很专业"（论文、项目）
         /          \
        /────────────\  基本层
       /              \    "能找到我要的信息"（导航、联系方式）
      /                \
     /──────────────────\  必要层
    "网站能正常打开"（性能、兼容性）
```

**设计原则**：先满足下层需求，再追求上层体验。

---

## 第十二章：设计语言与视觉风格

### 12.1 为什么选择深色主题？

深色主题不是为了"酷"，而是基于多重考量：

**1. 用户偏好**
- 开发者、研究人员普遍习惯深色界面（代码编辑器、终端）
- 目标用户对深色主题接受度高

**2. 视觉舒适度**
- 减少长时间阅读的视觉疲劳
- 夜间浏览更护眼

**3. 突出内容**
- 深色背景让浅色文字和图片更突出
- 图片在深色背景上显得更鲜艳

**4. 科技感传达**
- 与"信息技术"的专业方向相符
- 暗示技术能力和审美品味

**5. 3D 效果增强**
- 粒子效果在深色背景上更加醒目
- 光晕、发光效果更容易实现

### 12.2 设计语言定义：赛博朋克 + 极简主义

本项目的设计语言是两种风格的融合：

**赛博朋克元素**：
- 霓虹色彩（青色、紫色、蓝色渐变）
- 3D 城市粒子效果
- 加密文字动画
- 发光边框和光晕

**极简主义元素**：
- 大量留白
- 简洁的排版
- 克制的装饰
- 清晰的信息层次

**为什么要融合？**

| 纯赛博朋克 | 融合风格 | 纯极简主义 |
|-----------|---------|-----------|
| 视觉冲击强 | 平衡点 | 干净专业 |
| 可能显得不专业 | ✓ | 可能显得无趣 |
| 信息易被淹没 | ✓ | 缺乏记忆点 |

**具体实现**：
- 首页用赛博朋克（吸引眼球）
- 内容页用极简主义（便于阅读）
- 过渡自然，整体协调

### 12.3 视觉层次设计原则

好的视觉设计让用户的眼睛自然地按照设计者预期的顺序浏览。

**层次一：主焦点**
- 首页的名字和 3D 城市
- 每个页面的标题
- 使用：大字号、主色调、动画吸引

**层次二：次要信息**
- 副标题、简介
- 导航栏
- 使用：中等字号、白色文字

**层次三：辅助信息**
- 时间、标签、链接
- 使用：小字号、半透明文字

**层次四：背景元素**
- 分割线、边框、阴影
- 使用：极淡的颜色、不抢注意力

```css
/* 层次体现在透明度上 */
--text-primary: rgba(255, 255, 255, 1);      /* 主要文字 */
--text-secondary: rgba(255, 255, 255, 0.7);  /* 次要文字 */
--text-tertiary: rgba(255, 255, 255, 0.5);   /* 辅助文字 */
--border-subtle: rgba(255, 255, 255, 0.1);   /* 边框 */
```

### 12.4 品牌一致性：主色调贯穿全站

`#a5b4fc`（靛紫蓝）作为主色调，出现在：

- ✓ 首页标题
- ✓ 导航栏激活状态
- ✓ 时间线进度
- ✓ 链接悬停
- ✓ 标签背景
- ✓ 按钮边框
- ✓ 卡片悬停边框

**为什么要一致？**

品牌一致性建立**视觉记忆**。当用户看到这个颜色，就会联想到这个网站/这个人。

### 12.5 留白的艺术

留白不是"空"，而是设计的一部分。

**本项目的留白应用**：

```
┌─────────────────────────────────────┐
│                                     │  ← 顶部留白
│     ┌─────────────────────┐         │
│     │      内容区域        │         │  ← 左右留白
│     │                     │         │
│     └─────────────────────┘         │
│                                     │  ← 底部留白
└─────────────────────────────────────┘
```

**留白的作用**：
1. **呼吸感**：内容不拥挤，阅读舒适
2. **聚焦**：引导视线到内容区域
3. **高级感**：奢侈品广告都用大量留白
4. **响应式友好**：缩小屏幕时有收缩空间

---

## 第十三章：交互设计决策

### 13.1 为什么用滚动而不是分页？

传统多页网站 vs 单页滚动网站：

| 维度 | 多页网站 | 单页滚动 |
|------|---------|---------|
| 页面切换 | 重新加载 | 平滑滚动 |
| 加载速度 | 每页单独加载 | 首次稍慢，后续快 |
| 用户体验 | 割裂感 | 连贯感 |
| SEO | 较好 | 需要额外处理 |
| 适合场景 | 内容多、结构复杂 | 内容少、展示为主 |

**选择单页滚动的原因**：

1. **内容量适中**
   - 只有 5 个板块，不需要复杂导航
   - 总内容量在一页内可以承载

2. **叙事连贯**
   - 像讲故事一样：首页 → 简历 → 论文 → 作品 → 关于
   - 滚动浏览符合线性阅读习惯

3. **体验流畅**
   - 3D 城市作为背景，切换页面会打断体验
   - 滚动保持沉浸感

4. **技术优势**
   - React SPA 天然适合这种模式
   - 状态管理更简单

### 13.2 导航时间线的设计思考

左侧导航时间线不只是装饰，它解决了几个问题：

**问题一：用户迷失感**
- 长页面滚动时，用户不知道自己在哪
- 解决：时间线实时显示当前位置

**问题二：快速跳转需求**
- 用户想直接去某个板块
- 解决：点击节点可以跳转

**问题三：页面进度感**
- 用户想知道还有多少内容
- 解决：进度条可视化总体进度

**为什么放在左侧？**
- 西方阅读习惯从左到右，左侧是视觉起点
- 不干扰主内容区域
- 垂直排列符合滚动方向

**为什么用时间线而不是传统导航？**
- 时间线暗示"旅程"的概念
- 更有设计感
- 与简历的时间线呼应

### 13.3 弹窗展开 vs 跳转新页面

Publications 页面的论文详情为什么用弹窗而不是跳转？

**对比分析**：

| 维度 | 弹窗展开 | 跳转新页面 |
|------|---------|-----------|
| 上下文保持 | ✓ 保持列表位置 | ✗ 需要返回 |
| 视觉连贯 | ✓ layoutId 动画 | ✗ 页面跳转 |
| 快速浏览 | ✓ 关闭即返回 | ✗ 需要点返回 |
| 深度阅读 | ✗ 弹窗空间有限 | ✓ 独立页面 |
| URL 分享 | ✗ 无独立 URL | ✓ 可直接分享 |

**选择弹窗的原因**：
- 论文摘要属于"快速预览"场景
- 深度阅读会跳转到 PDF 原文
- layoutId 动画是亮点功能

### 13.4 动画的节制使用原则

动画是双刃剑：用得好锦上添花，用多了适得其反。

**本项目的动画使用原则**：

**1. 有目的的动画**
```
✓ BlurFade：引导视线，暗示新内容出现
✓ 卡片悬停：反馈用户操作
✓ 页面滚动：平滑过渡，减少跳跃感
✗ 无意义的旋转、闪烁
```

**2. 适度的时长**
- 太快（<0.2s）：感觉不到
- 太慢（>0.8s）：让人等待焦虑
- 最佳（0.3-0.6s）：既能感知，又不拖沓

**3. 可中断的动画**
- 用户滚动时不强制等待动画完成
- 快速操作时动画可以跳过

**4. 渐进增强**
- 核心功能不依赖动画
- 低性能设备可以禁用动画

### 13.5 3D 首页的"惊艳但不打扰"原则

3D 粒子城市是首页的核心亮点，但设计时要避免它变成干扰。

**惊艳的部分**：
- 首次访问的视觉冲击
- 点击触发的爆炸动画
- 缓慢自动旋转的沉浸感

**不打扰的部分**：
- 文字内容在 3D 场景之上，始终可读
- 自动旋转速度极慢（0.1），不抢注意力
- 没有声音、没有弹窗
- 可以直接滚动离开，不强制互动

**实现技巧**：
```css
.hero-overlay {
  pointer-events: none;  /* 让鼠标事件穿透到 3D 场景 */
}

.hero-content {
  pointer-events: auto;  /* 文字区域恢复交互 */
  background: rgba(0, 0, 0, 0.6);  /* 半透明背景确保可读性 */
}
```

---

## 第十四章：信息架构设计

### 14.1 五个页面的排列顺序逻辑

页面顺序不是随意的，而是遵循用户心理模型：

```
Home → Resume → Publications → Gallery → About
 ↓        ↓          ↓           ↓        ↓
第一印象  专业能力    学术成果    个人爱好   深入了解
```

**顺序设计逻辑**：

**1. Home（首页）**
- 位置：第一
- 原因：用户第一眼看到的
- 内容：名字、一句话介绍、视觉冲击

**2. Resume（简历）**
- 位置：第二
- 原因：HR 最关心的内容
- 内容：教育、经历、技能

**3. Publications（论文）**
- 位置：第三
- 原因：学术能力的证明
- 内容：发表的论文列表

**4. Gallery（画廊）**
- 位置：第四
- 原因：展示个人爱好，增加人格魅力
- 内容：摄影作品

**5. About（关于）**
- 位置：最后
- 原因：最后留下联系方式
- 内容：详细介绍、社交链接

**为什么 Gallery 在 About 前面？**
- About 页通常有联系方式
- 用户浏览完所有内容后，最后看到联系方式
- 形成"了解 → 感兴趣 → 联系"的转化链路

### 14.2 内容优先级设计

每个页面内部也有信息优先级：

**Resume 页面优先级**：
```
高   教育背景（学历是硬门槛）
↑    研究经历（核心竞争力）
│    项目经历（实践能力）
│    实习经历（工作经验）
↓    技能列表（辅助信息）
低
```

**Publications 页面优先级**：
```
高   论文标题（最重要）
↑    发表年份和期刊（可信度）
│    作者列表（贡献度）
│    摘要（内容概览）
↓    标签和链接（辅助）
低
```

### 14.3 渐进式信息披露

不要一次展示所有信息，让用户按需深入。

**实现方式**：

**1. 首页只展示核心信息**
```
❌ 把所有内容都放首页
✓ 首页只有：名字 + 一句话介绍 + 导航
```

**2. 论文先显示摘要预览**
```
❌ 直接显示完整摘要
✓ 显示前 150 字 + "点击展开"
```

**3. 画廊先显示缩略图**
```
❌ 直接加载高清大图
✓ 先加载 400px 缩略图，点击后加载高清图
```

**好处**：
- 减少信息过载
- 提高页面性能
- 让用户有控制感

### 14.4 F 型浏览模式的适配

眼动研究表明，用户浏览网页时视线呈 F 型：

```
███████████████████
███████████
███████████████
████████
██████████████████
```

- 第一行从左到右完整扫描
- 然后视线下移，但扫描范围变窄
- 最后变成垂直扫描左侧

**设计适配**：

**1. 重要信息放左上角**
- 名字在左上
- 导航在顶部

**2. 左侧放导航元素**
- 时间线在左侧
- 简历的时间在左侧

**3. 右侧放辅助信息**
- 链接、按钮可以在右侧
- 用户扫过会看到，但不是第一眼

---

## 第十五章：可用性与无障碍设计

### 15.1 键盘导航支持

不是所有用户都用鼠标。键盘用户需要：

**ESC 关闭弹窗**
```javascript
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setActiveId(null);
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, []);
```

**为什么重要？**
- 熟练用户习惯用键盘
- 辅助技术用户依赖键盘
- ESC 关闭是普遍预期

### 15.2 触摸友好设计

移动端用户用手指操作，需要考虑：

**最小触摸目标：44px**
```css
@media (hover: none) and (pointer: coarse) {
  .navbar a,
  .language-switcher span {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}
```

**为什么是 44px？**
- Apple 人机交互指南推荐的最小尺寸
- 适合普通成年人手指
- 更小会导致误触

**点击反馈**
```css
.pub-card {
  -webkit-tap-highlight-color: rgba(165, 180, 252, 0.2);
}
```

触摸屏没有 hover，需要点击时给反馈。

### 15.3 语言切换的便捷性

国际化不只是翻译文字，还要考虑切换体验：

**设计决策**：
1. 语言切换器始终可见（固定在导航栏）
2. 切换即时生效（无需刷新）
3. 记住用户选择（localStorage）
4. 默认语言合理（根据用户可能的分布选择）

**位置选择**：
```
导航栏左侧（本项目选择）
├── 优点：不干扰主导航
├── 优点：左侧是视觉起点
└── 缺点：移动端可能被遮挡

导航栏右侧
├── 优点：常见位置
└── 缺点：与导航链接混在一起
```

### 15.4 加载状态反馈

用户等待时需要知道"正在加载"，否则会以为卡住了。

**图片加载反馈**：
```jsx
const BlurImage = ({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={card.thumbnail}
      onLoad={() => setLoaded(true)}
      className={loaded ? "blur-none" : "blur-md"}  // 未加载完显示模糊
    />
  );
};
```

**弹窗打开反馈**：
```jsx
{/* 加载占位 */}
{!loaded && (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  </div>
)}
```

### 15.5 错误处理与容错

好的设计要预防错误，也要优雅处理错误：

**预防错误**：
- 点击外部关闭弹窗（避免被困在弹窗里）
- ESC 键关闭（多一个退出方式）
- 防止背景滚动（避免误操作）

**容错设计**：
```javascript
// 语言切换时更新选中的卡片数据
useEffect(() => {
  if (selected) {
    const updatedCard = cards.find(card => card.id === selected.id);
    if (updatedCard) {
      setSelected(updatedCard);
    }
  }
}, [cards]);
```

如果用户在查看图片时切换语言，图片标题会自动更新，而不是显示旧语言。

---

# 第三部分：细节中的产品智慧

> 魔鬼藏在细节里。这一部分从代码中的微小细节出发，揭示它们如何影响用户体验。

---

## 第十六章：微交互设计的产品价值

### 16.1 什么是微交互？

微交互是用户与界面之间的微小互动反馈。它们通常只有 0.2-0.6 秒，却能显著影响用户对产品的感知。

**微交互的作用**：
- 确认用户的操作已被接收
- 传达元素的可交互性
- 提供状态变化的视觉连续性
- 增添产品的"灵魂"

### 16.2 悬停效果链：传达"可交互"的信号

当用户鼠标悬停在卡片上时，不是只有一个属性变化，而是**四个属性同时变化**：

```css
/* src/App.css */
.pub-card:hover {
  transform: translateY(-5px);              /* 1. 上浮 */
  background: rgba(255, 255, 255, 0.08);    /* 2. 背景变亮 */
  border-color: rgba(165, 180, 252, 0.5);   /* 3. 边框变蓝 */
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);  /* 4. 阴影加深 */
}
```

**为什么要同时变化四个属性？**

| 单一变化 | 用户感受 |
|---------|---------|
| 只有上浮 | "有点动，但不确定能不能点" |
| 只有变色 | "可能是装饰效果？" |
| 四个同时变化 | "这明显是个按钮，点它！" |

**产品价值**：用户不需要思考"这能不能点"，直觉告诉他可以。减少认知负担 = 更好的体验。

### 16.3 过渡时长的科学：0.2s-0.6s 的秘密

```css
.pub-card {
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}
```

为什么是 0.3 秒？

| 时长 | 用户感受 | 适用场景 |
|------|---------|---------|
| < 0.1s | 感知不到变化 | 几乎不用 |
| 0.1-0.2s | 快速但能感知 | 按钮点击反馈 |
| **0.2-0.4s** | **自然流畅** | **悬停效果、状态切换** |
| 0.4-0.6s | 从容优雅 | 页面过渡、模态框 |
| > 0.8s | 让人等待焦虑 | 避免使用 |

**产品价值**：0.3s 是人类感知的"甜蜜点"——足够快不让人等待，又足够慢让人感知到变化。

### 16.4 方向性动画：视觉隐喻的力量

```css
/* src/App.css - PDF链接的悬停效果 */
.pub-link-compact:hover {
  transform: translateX(4px);  /* 向右移动 4px */
}
```

为什么是**向右**移动？

这利用了人类的视觉隐喻：
- 向右 = 前进、去往某处
- 向上 = 提升、悬浮
- 向左 = 返回、后退

**对比**：
```
→ PDF  （向右移动：暗示"点击后会带你去某处"）
↑ PDF  （向上移动：没有方向暗示，纯装饰）
```

**产品价值**：用户下意识理解"这个链接会带我去别的地方"，不需要读文字就知道功能。

### 16.5 关闭按钮的 90° 旋转

```css
/* src/pages/Publications.css */
.modal-close:hover {
  transform: rotate(90deg);
}
```

关闭按钮（×）悬停时旋转 90°，这个细节有什么用？

**心理学原理**：
- 旋转动画吸引注意力，确认用户的操作意图
- ×旋转后仍然是×，但动态变化增强了"操作确认感"
- 比单纯变色更能传达"这是一个可点击的关闭按钮"

**产品价值**：用户不会误点关闭按钮，因为悬停时的动画给了他"确认"的机会。

### 16.6 汉堡菜单的状态连续性

```css
/* 三条横线变成叉号 */
.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}
```

**为什么不直接切换图标？**

| 实现方式 | 用户感受 |
|---------|---------|
| 直接切换图标（☰ → ×） | "突然变了，有点跳跃" |
| 动画过渡（三条线旋转成×） | "原来是这样变的！很自然" |

**产品价值**：
- 视觉连续性让用户理解状态变化
- 减少"界面突然改变"带来的困惑
- 增添产品的精致感

### 16.7 Dock 图标的 Mac 风格悬停

```css
/* src/components/Dock.css */
.dock-icon:hover {
  transform: translateY(-8px) scale(1.2);  /* 上浮 + 放大 */
}

.dock-icon:hover svg {
  width: 32px;
  height: 32px;  /* SVG 图标也跟着放大 */
}
```

为什么图标和容器都要变化？

**单层变化 vs 双层变化**：
```
单层：容器放大，图标相对变小 → 不协调
双层：容器和图标同步放大 → 整体感强
```

**产品价值**：模仿 macOS Dock 的经典交互，用户会下意识感到"这个网站很精致"。

### 16.8 微交互设计原则总结

| 原则 | 解释 | 本项目实例 |
|------|------|-----------|
| **有目的** | 每个动画都要传达信息 | 悬停上浮 = 可点击 |
| **适度** | 0.2-0.6s，不过长 | 0.3s 过渡时间 |
| **一致** | 相同类型用相同动画 | 所有卡片统一悬停效果 |
| **有方向** | 利用视觉隐喻 | 链接向右移动 |
| **连续** | 状态变化要有过渡 | 汉堡菜单动画变形 |

---

## 第十七章：防御性设计与容错机制

### 17.1 什么是防御性设计？

防御性设计是指：**假设一切都可能出错，提前做好应对**。

目标：让用户**永远看不到报错页面**，即使代码中某些部分出了问题。

### 17.2 可选链操作符：优雅地处理 null

```javascript
// src/components/layout-grid.jsx
isSelected={selected?.id === card.id}
```

这个小小的 `?.` 解决了什么问题？

**没有可选链时**：
```javascript
isSelected={selected.id === card.id}
// 如果 selected 是 null，页面直接崩溃！
// 用户看到：白屏 + 控制台报错
```

**有可选链时**：
```javascript
isSelected={selected?.id === card.id}
// 如果 selected 是 null，表达式返回 undefined
// 用户看到：正常页面，只是没有选中效果
```

**产品价值**：用户永远不会因为数据状态问题看到崩溃页面。

### 17.3 三层容错的多语言函数

```javascript
// src/data/galleryData.js
export const getLocalizedText = (textObj, locale = 'zh') => {
  if (typeof textObj === 'string') return textObj;      // 第一层：兼容纯字符串
  return textObj[locale] || textObj.zh || '';           // 第二层+第三层：语言降级
};
```

**三层容错链**：

```
输入 → 是字符串吗？ → 是 → 直接返回
              ↓ 否
        有当前语言版本吗？ → 有 → 返回当前语言
              ↓ 没有
        有中文版本吗？ → 有 → 返回中文
              ↓ 没有
        返回空字符串（不崩溃）
```

**产品价值**：
- 翻译不完整时，用户看到中文而非空白
- 支持混合使用字符串和多语言对象
- 开发者可以逐步添加翻译，不必一次完成

### 17.4 图片加载的优雅降级

```javascript
// src/components/pixelated-canvas.jsx
img.onerror = () => {
  console.error("Failed to load image");
};

try {
  imageData = off.getImageData(0, 0, offscreen.width, offscreen.height);
} catch {
  // Canvas 跨域错误时，降级为普通图片显示
  ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
  return;
}
```

**场景**：用户引用了外部图片，浏览器因为跨域策略拒绝访问像素数据。

| 没有容错 | 有容错 |
|---------|--------|
| 图片完全不显示 | 图片正常显示，只是没有特效 |
| 用户困惑 | 用户可能根本没注意到 |

**产品价值**：用户只会觉得"这张图没有特效"，而不是"网站坏了"。

### 17.5 数据双重校验

```jsx
// src/pages/Publications.jsx
const activePub = publications.find(pub => pub.id === activeId);

{activeId && activePub && (
  <Modal>...</Modal>
)}
```

为什么要检查两个条件？

| 场景 | activeId | activePub | 只检查 activeId | 双重检查 |
|------|----------|-----------|----------------|---------|
| 正常点击 | 有值 | 有值 | ✓ 正常 | ✓ 正常 |
| 数据更新中 | 有值 | null | ✗ 渲染空白 | ✓ 不渲染 |
| 语言切换 | 有值 | 可能变化 | ✗ 可能出错 | ✓ 安全 |

**产品价值**：即使在数据异步更新的瞬间，用户也不会看到空白弹窗。

### 17.6 清理函数：恢复被修改的全局状态

```javascript
// src/pages/Publications.jsx
useEffect(() => {
  if (activeId) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  // 清理函数：组件卸载时恢复
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [activeId]);
```

**问题场景**：
1. 用户打开弹窗（body.overflow = 'hidden'）
2. 用户点击导航跳转到其他页面
3. 组件卸载，但 overflow 仍然是 'hidden'
4. 用户无法滚动新页面！

**清理函数解决了这个问题**：组件卸载时自动恢复 `overflow: auto`。

**产品价值**：用户在任何操作顺序下都能正常滚动页面。

### 17.7 防御性设计原则总结

| 原则 | 解释 | 代码实例 |
|------|------|---------|
| **假设数据可能为空** | 使用可选链 `?.` | `selected?.id` |
| **提供降级方案** | 失败时用备选方案 | Canvas → 普通图片 |
| **多层容错** | 一层失败还有下一层 | 当前语言 → 中文 → 空字符串 |
| **清理副作用** | 修改全局状态要还原 | `return () => {...}` |
| **双重校验** | 关键操作检查多个条件 | `activeId && activePub` |

---

## 第十八章：性能感知优化

### 18.1 感知性能 vs 实际性能

**关键洞察**：用户感知到的"快"比实际的快更重要。

| 场景 | 实际耗时 | 用户感知 |
|------|---------|---------|
| 白屏等待 2 秒 | 2s | "好慢！" |
| 模糊图 + 渐变清晰 2 秒 | 2s | "挺快的" |

两种方式实际耗时相同，但用户感受完全不同。

### 18.2 模糊占位图：让等待变得可接受

```jsx
// src/components/layout-grid.jsx
const BlurImage = memo(({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={card.thumbnail}
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition duration-200",
        loaded ? "blur-none" : "blur-md"  // 未加载完显示模糊
      )}
    />
  );
});
```

**心理学原理**：

```
白屏等待：用户大脑处于"空闲焦虑"状态
模糊图等待：用户大脑处于"处理视觉信息"状态
```

当大脑有事可做（处理模糊图像），等待感就会减轻。

**产品价值**：同样的加载时间，用户感觉更快。

### 18.3 Loading 动画的心理学

```jsx
// src/components/layout-grid.jsx
{!loaded && (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  </div>
)}
```

**为什么旋转的圆圈能减少焦虑？**

1. **动态反馈**：证明系统在工作，不是卡死了
2. **视觉占位**：填充空白区域，减少"空洞感"
3. **预期管理**：暗示"很快就好"

**产品价值**：用户知道"正在加载"，不会以为页面坏了而离开。

### 18.4 缩略图 + 高清图分离策略

```javascript
// src/data/galleryData.js
export const getCloudinaryUrl = (publicId, type = 'thumb') => {
  if (type === 'thumb') {
    return `...w_400/${publicId}`;   // 400px 宽度
  } else {
    return `...w_1600/${publicId}`;  // 1600px 宽度
  }
};
```

**加载流程**：

```
首屏加载
├── 所有图片加载 400px 缩略图（每张约 20KB）
├── 用户看到完整的图片墙
└── 首屏完成！

用户点击某张图
├── 触发加载 1600px 高清图（约 200KB）
├── 显示 loading 动画
└── 高清图加载完成，替换显示
```

**数据对比**：

| 策略 | 首屏数据量（20张图） | 首屏时间 |
|------|---------------------|---------|
| 直接加载高清图 | 20 × 200KB = 4MB | 慢 |
| 先加载缩略图 | 20 × 20KB = 400KB | 快 10 倍 |

**产品价值**：用户秒开图片墙，点击后再等高清图，符合使用预期。

### 18.5 滚动节流：800ms 的精确控制

```javascript
// src/App.jsx
const scrollToSection = useCallback((index) => {
  isScrolling.current = true;
  section.scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    isScrolling.current = false;
  }, 800);
}, []);
```

**为什么是 800ms？**

```
smooth 滚动动画通常持续约 500-800ms
├── 设置太短（如 300ms）：动画还没完，就开始检测新位置，页面"抖动"
├── 设置太长（如 1500ms）：滚动已完成，导航高亮延迟更新
└── 800ms：刚好覆盖动画时长，无缝衔接
```

**产品价值**：点击导航后，页面平滑滚动，导航高亮同步更新，没有"抖动"。

### 18.6 GPU Shader：让 CPU 空出来响应用户

```javascript
// src/components/ParticlesCityReal.jsx - 顶点着色器
const vertexShader = `
  uniform float uProgress;

  void main() {
    vec3 pos = position;

    if (uProgress > 0.0) {
      // 爆炸动画计算...
      pos = position + explosionDir * ease;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
```

**CPU vs GPU 计算**：

| 方式 | 计算位置 | 主线程影响 |
|------|---------|-----------|
| JavaScript 循环更新粒子 | CPU | 阻塞用户操作 |
| Shader 计算 | GPU | 主线程空闲 |

**产品价值**：
- 3D 动画播放时，用户仍然可以流畅地点击、滚动
- 数万粒子的爆炸动画不会让页面卡顿

### 18.7 性能感知优化原则总结

| 原则 | 解释 | 本项目实例 |
|------|------|-----------|
| **视觉占位** | 用模糊图/骨架屏填充空白 | 图片 blur-md 占位 |
| **进度反馈** | 让用户知道在加载 | 旋转 loading 动画 |
| **按需加载** | 先加载必要的，其他延后 | 缩略图 → 高清图 |
| **精确时机** | 动画和状态更新同步 | 800ms 滚动节流 |
| **GPU 加速** | 重计算移到 GPU | Shader 粒子动画 |

---

## 第十九章：视觉一致性系统

### 19.1 什么是设计系统？

设计系统是一套**可复用的规则**，确保整个产品的视觉风格统一。

没有设计系统：每个组件自己定义圆角、颜色、间距 → 混乱
有设计系统：所有组件遵循同一套规则 → 统一、专业

### 19.2 圆角体系：从 4px 到 24px

本项目的圆角使用规律：

```css
/* 小元素 - 小圆角 */
.tag { border-radius: 4px; }

/* 按钮 - 中小圆角 */
.contact-link { border-radius: 8px; }

/* 卡片 - 中等圆角 */
.pub-card { border-radius: 12px; }

/* 大容器 - 大圆角 */
.modal-content { border-radius: 16px; }

/* 特殊形状 - 最大圆角 */
.dock { border-radius: 24px; }
.skills-list span { border-radius: 20px; }  /* 药丸形状 */
```

**规律**：

| 元素大小 | 圆角值 | 视觉效果 |
|---------|-------|---------|
| 小（标签、徽章） | 4px | 微微圆润 |
| 中小（按钮） | 8px | 明显但不夸张 |
| 中（卡片） | 12px | 友好柔和 |
| 大（弹窗） | 16px | 现代感强 |
| 特殊（药丸） | 20-24px | 完全圆润 |

**产品价值**：用户下意识感到界面"协调"，不会觉得"这里怪怪的"。

### 19.3 透明度体系：不用大小也能区分层级

```css
/* 主要文字 - 100% */
color: #ffffff;

/* 正常文字 - 70% */
color: rgba(255, 255, 255, 0.7);

/* 次要文字 - 50% */
color: rgba(255, 255, 255, 0.5);

/* 最弱文字 - 35% */
color: rgba(255, 255, 255, 0.35);
```

**视觉层级对比**：

```
标题      ████████████████  100%
正文      ███████████       70%
副标题    ████████          50%
备注      █████             35%
```

**为什么不用字号区分？**

- 字号变化会影响布局
- 透明度变化只影响视觉权重
- 两者结合使用效果更好

**产品价值**：用户一眼就能区分什么是重点、什么是补充信息。

### 19.4 间距体系：8px 的倍数

```css
/* 本项目的间距使用 */
gap: 8px;           /* 1× */
padding: 1rem;      /* 16px = 2× */
margin: 1.5rem;     /* 24px = 3× */
margin: 2rem;       /* 32px = 4× */
margin-bottom: 3rem; /* 48px = 6× */
margin-bottom: 4rem; /* 64px = 8× */
```

**为什么是 8px？**

- 8 可以被 2、4 整除，方便计算
- 现代屏幕像素密度下，8px 是合适的最小单位
- 与 16px（1rem）的关系简单：1rem = 2 × 8px

**产品价值**：统一的间距创造"垂直节奏感"，页面看起来整齐有序。

### 19.5 主色一致性：#a5b4fc 的贯穿

主色 `#a5b4fc`（靛紫蓝）出现在：

```css
/* 导航激活状态 */
.navbar a.active { color: #a5b4fc; }

/* 时间线进度 */
.nav-timeline-progress { background: ...#8b5cf6...#a855f7...; }

/* 链接悬停 */
.navbar a:hover { color: #a5b4fc; }

/* 卡片悬停边框 */
.pub-card:hover { border-color: rgba(165, 180, 252, 0.5); }

/* 标签背景 */
.tag { background: rgba(165, 180, 252, 0.15); }

/* 节点光晕 */
.nav-timeline-dot.active { box-shadow: 0 0 8px rgba(165, 180, 252, 0.8); }
```

**RGB 对应关系**：`#a5b4fc` = `rgb(165, 180, 252)`

**产品价值**：
- 建立**视觉记忆**：用户看到这个颜色就联想到这个网站
- 创造**品牌感**：统一的强调色让网站有"专属身份"

### 19.6 毛玻璃效果的一致使用

```css
/* 导航栏 */
.navbar {
  backdrop-filter: blur(5px);
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
}

/* Dock */
.dock {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
}

/* 弹窗背景 */
.modal-backdrop {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.85);
}
```

**规律**：
- 导航栏：轻度模糊（5px），保持内容可见
- Dock 和弹窗：中度模糊（10px），强调悬浮感

**产品价值**：毛玻璃效果传达"现代、精致"的感觉，统一使用不会显得突兀。

### 19.7 视觉一致性检查清单

| 检查项 | 问题示例 | 本项目做法 |
|-------|---------|-----------|
| 圆角一致吗？ | 卡片 8px，按钮 12px（混乱） | 按元素大小递进 |
| 颜色统一吗？ | 有的链接蓝色，有的绿色 | 统一用 #a5b4fc |
| 间距有规律吗？ | 有的 15px，有的 20px | 8px 倍数系统 |
| 透明度一致吗？ | 有的 0.6，有的 0.75 | 35%/50%/70%/100% |
| 效果统一吗？ | 有的有阴影，有的没有 | 统一使用毛玻璃 |

---

## 第二十章：数据结构的产品思维

### 20.1 数据结构如何影响产品迭代

好的数据结构不仅是"技术正确"，还要**支持产品快速迭代**。

**思考方式**：
- 如果产品经理要加个功能，代码改动大吗？
- 如果要新增一种数据，结构能容纳吗？
- 如果非开发人员要修改内容，能做到吗？

### 20.2 双层数据模式：分离"是什么"和"怎么组织"

```javascript
// src/data/galleryData.js

// 第一层：图片数据（是什么）
export const galleryImages = [
  { id: 1, publicId: 'xxx', title: {...}, description: {...} },
  { id: 2, publicId: 'yyy', title: {...}, description: {...} },
  // ...
];

// 第二层：分类配置（怎么组织）
export const galleryCategories = {
  nature: { ids: [1, 2, 3, 4, 5], label: { zh: '北京', en: 'Beijing' } },
  urban: { ids: [16, 17, 18, 19], label: { zh: '日本', en: 'Japan' } },
};
```

**为什么要分离？**

| 操作 | 单层结构 | 双层结构 |
|------|---------|---------|
| 调整分类顺序 | 移动多条数据 | 修改 ids 数组 |
| 一张图属于多个分类 | 复制数据 | 在多个 ids 中引用 |
| 新增分类 | 修改图片数据 | 只加一行配置 |

**产品价值**：产品经理说"把这张图从'北京'移到'其他城市'"，开发只需改一个数字。

### 20.3 className 内置响应式：让非开发者也能调布局

```javascript
// src/data/galleryData.js
{
  id: 1,
  publicId: 'P1000456_rj2xtv',
  className: "md:col-span-3 md:row-span-3",  // 布局信息在数据中
  title: { zh: "北京的春", en: "Spring in Beijing" }
}
```

**为什么把 className 放在数据里？**

**传统方式**：布局写在组件中
```jsx
{images.map(img => (
  <div className={img.id === 1 ? "col-span-3" : "col-span-1"}>
    ...
  </div>
))}
```
→ 调整布局需要改代码

**本项目方式**：布局写在数据中
```jsx
{images.map(img => (
  <div className={img.className}>
    ...
  </div>
))}
```
→ 调整布局只需改数据文件

**产品价值**：非开发人员也能通过修改 JSON 调整哪张图大、哪张图小。

### 20.4 localStorage 语言偏好：记住用户选择

```javascript
// src/i18n.js
const savedLanguage = localStorage.getItem('language') || 'en';

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});
```

**用户体验对比**：

| 没有 localStorage | 有 localStorage |
|------------------|-----------------|
| 每次访问都是默认英文 | 上次选中文，这次还是中文 |
| 用户要反复切换 | 用户设置一次，永久记住 |

**产品价值**：用户不需要重复操作，系统"记得"他的偏好。

### 20.5 语言切换时的状态保持

```javascript
// src/components/layout-grid.jsx
useEffect(() => {
  if (selected) {
    const updatedCard = cards.find(card => card.id === selected.id);
    if (updatedCard) {
      setSelected(updatedCard);
    }
  }
}, [cards]);
```

**场景**：用户打开了一张图片的详情，然后切换语言。

| 没有状态保持 | 有状态保持 |
|-------------|-----------|
| 弹窗关闭，用户要重新点开 | 弹窗保持打开，标题变成新语言 |
| 用户："我刚才看的是哪张？" | 用户："哦，标题变了，其他不变" |

**产品价值**：语言切换是"无损操作"，不会打断用户的当前行为。

### 20.6 多语言文案的结构设计

```json
// src/locales/zh.json
{
  "home": {
    "greeting": "你好，我是黄楚睿。",
    "subtitle": "学生 / 开发者",
    "description": "我的研究兴趣在智慧城市和大数据领域，",
    "description2": "目前专注于凸优化和强化学习，",
    "description3": "旨在利用这些技术构建更智能、更高效的城市系统。"
  }
}
```

**为什么 description 分成三行？**

1. **方便本地化**：不同语言的句子长度不同，分行后各自调整
2. **支持换行显示**：前端可以在每行后加 `<br/>`
3. **便于维护**：修改一句话不影响其他句子

**产品价值**：翻译人员可以逐句翻译，不需要一次处理整段。

### 20.7 数据结构设计原则总结

| 原则 | 解释 | 本项目实例 |
|------|------|-----------|
| **分离关注点** | 数据和配置分开 | galleryImages vs galleryCategories |
| **配置优于代码** | 能用配置解决就不写代码 | className 在数据中 |
| **记住用户偏好** | 减少重复操作 | localStorage 存语言 |
| **无损切换** | 状态变化不丢失上下文 | 语言切换保持选中状态 |
| **便于翻译** | 结构适合本地化 | description 分行存储 |

---

## 总结

本文从一个实际项目出发，分三部分介绍了现代前端开发的核心知识：

### 第一部分：技术实现

1. **架构设计**：合理的目录结构，清晰的组件分层
2. **组件化思维**：像乐高一样拼装 UI
3. **视觉设计**：色彩体系、渐变运用
4. **CSS 技巧**：毛玻璃、渐变遮罩、悬停效果
5. **动画实现**：淡入淡出、加密文字、平滑过渡
6. **3D 可视化**：Three.js 入门、Shader 基础
7. **响应式设计**：断点策略、移动端适配
8. **性能优化**：图片 CDN、memo、懒加载
9. **国际化**：多语言支持
10. **实用技巧**：滚动导航、外部点击、ESC 关闭

### 第二部分：产品设计思维

11. **用户画像**：明确目标用户，理解使用场景
12. **设计语言**：赛博朋克 + 极简主义的融合
13. **交互决策**：每个设计选择背后的"为什么"
14. **信息架构**：页面顺序、内容优先级、渐进式披露
15. **可用性设计**：键盘支持、触摸友好、无障碍考量

### 第三部分：细节中的产品智慧

16. **微交互设计**：悬停效果链、过渡时长、方向性动画
17. **防御性设计**：可选链、容错降级、清理函数
18. **性能感知**：模糊占位、loading动画、按需加载
19. **视觉一致性**：圆角体系、透明度体系、间距体系
20. **数据结构思维**：双层数据、配置优于代码、状态保持

### 核心理念

> **技术是手段，设计是目的。细节决定品质。**

好的前端开发不仅要会"怎么做"（How），更要理解"为什么这样做"（Why）。

- **技术实现**解决的是"能不能"的问题
- **产品设计**解决的是"好不好"的问题
- **细节打磨**解决的是"精不精"的问题

每一个看似微小的细节——0.3秒的过渡时长、向右移动的4像素、三层容错的函数——都在默默影响着用户体验。用户可能说不出哪里好，但他们能感受到"这个网站很舒服"。

希望这份文档能帮助你理解前端开发的方方面面。记住，最好的学习方式是动手实践！

---

*文档作者：基于 Alto 个人网站项目整理*
*最后更新：2025年*
