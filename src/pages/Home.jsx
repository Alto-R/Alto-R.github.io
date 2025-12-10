// src/pages/Home.jsx
import React, { Suspense, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import ParticlesCityReal from '../components/ParticlesCityReal';
import { LanguageContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      greeting: "Hi, I'm Churui Huang.",
      subtitle: "Student / Developer.",
      description: "My research interests are in smart cities and big data,",
      description2: "with a current focus on convex optimization and reinforcement learning,",
      description3: "aiming to leverage these techniques to build more intelligent and efficient urban systems.",
      button: "View Resume"
    },
    zh: {
      greeting: "你好，我是黄楚睿。",
      subtitle: "学生 / 开发者",
      description: "我的研究兴趣在智慧城市和大数据领域，",
      description2: "目前专注于凸优化和强化学习，",
      description3: "旨在利用这些技术构建更智能、更高效的城市系统。",
      button: "查看简历"
    }
  };

  const text = content[language];

  return (
    <div className="home-container">
      {/* --- WebGL Layer (底层) --- */}
      <div className="canvas-container">
        <Canvas dpr={[1, 2]}>
          <Suspense fallback={null}>
            {/* 调整相机：
              高空斜向下看整个城市，初始角度略微偏右
              数据范围: X[-254,256], Y[0,208], Z[-220,220]
            */}
            <PerspectiveCamera makeDefault position={[-180, 100, 30]} fov={60} />

            <ambientLight intensity={0.5} />

            {/* 轻微的雾气效果 */}
            <fog attach="fog" args={['#050505', 300, 600]} />

            <ParticlesCityReal />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={0.1}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* --- HTML Layer (上层覆盖) --- */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{text.greeting}</h1>
          <p className="subtitle">
            {text.subtitle} <br/>
            <br/>
            {text.description} <br/>
            {text.description2} <br/>
            {text.description3}
          </p>

          <div style={{marginTop: '2rem'}}>
             <button
               onClick={() => navigate('/resume')}
               style={{
                 padding: '12px 24px',
                 background: 'white',
                 border: 'none',
                 borderRadius: '4px',
                 cursor: 'pointer',
                 fontWeight: 'bold',
                 color: 'black',
                 boxShadow: '0 0 10px rgba(255,255,255,0.3)' // 给按钮加一点微光
             }}>
                 {text.button}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;