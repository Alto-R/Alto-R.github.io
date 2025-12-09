// src/pages/Home.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import ParticlesWave from '../components/ParticlesWave';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* --- WebGL Layer (底层) --- */}
      <div className="canvas-container">
        {/* Canvas 是 R3F 的入口 */}
        <Canvas dpr={[1, 2]}> {/* dpr 适配高清屏 */}
          <Suspense fallback={null}>
            {/* 设置相机位置和视野 */}
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
            
            {/* 添加一点环境光 */}
            <ambientLight intensity={0.5} />

            {/* 我们的粒子组件 */}
            <ParticlesWave count={8000} />
            
            {/* 允许鼠标控制视角旋转 (可选，去掉则为固定视角) */}
            {/* enableZoom={false} 禁止缩放，避免穿帮 */}
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={true} // 开启自动缓慢旋转
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2} // 限制不能看到地平线以下
            />
          </Suspense>
        </Canvas>
      </div>

      {/* --- HTML Layer (上层覆盖) --- */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Hi, I'm Churui Huang.</h1>
          <p className="subtitle">
            Student / Developer. <br/>
            <br/>
            My research interests are in smart cities and big data, <br/>
            with a current focus on convex optimization and reinforcement learning, <br/>
            aiming to leverage these techniques to build more intelligent and efficient urban systems.
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
                 color: 'black'
             }}>
                 View Resume
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;