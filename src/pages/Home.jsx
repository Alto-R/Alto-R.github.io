// src/pages/Home.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import ParticlesCity from '../components/ParticlesCity'; // <--- 引入新组件

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* --- WebGL Layer (底层) --- */}
      <div className="canvas-container">
        <Canvas dpr={[1, 2]}>
          <Suspense fallback={null}>
            {/* 调整相机：
              y=15, z=25 (拉得更远，看全景)
            */}
            <PerspectiveCamera makeDefault position={[12, 15, 25]} fov={40} />
            
            <ambientLight intensity={0.5} />
            
            {/* 雾气调整：让远处完全变黑，突出近处的霓虹感 */}
            <fog attach="fog" args={['#050505', 10, 60]} />

            <ParticlesCity />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={true}
              autoRotateSpeed={0.3} // 更慢更庄重
              maxPolarAngle={Math.PI / 2} 
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