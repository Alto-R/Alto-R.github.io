// src/pages/Home.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import ParticlesCityReal from '../components/ParticlesCityReal'; // <--- 使用真实城市建筑数据

const Home = () => {
  const navigate = useNavigate();

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
            <PerspectiveCamera makeDefault position={[-180, 60, -60]} fov={60} />

            <ambientLight intensity={0.5} />

            {/* 轻微的雾气效果 */}
            <fog attach="fog" args={['#050505', 200, 400]} />

            <ParticlesCityReal />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
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
                 color: 'black',
                 boxShadow: '0 0 10px rgba(255,255,255,0.3)' // 给按钮加一点微光
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