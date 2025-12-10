// src/pages/Home.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParticlesCityReal from '../components/ParticlesCityReal';
import { BlurFade } from '../components/BlurFade';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <BlurFade delay={0.25} inView>
            <h1>{t('home.greeting')}</h1>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <p className="subtitle">
              {t('home.subtitle')} <br/>
              <br/>
              {t('home.description')} <br/>
              {t('home.description2')} <br/>
              {t('home.description3')}
            </p>
          </BlurFade>

          <BlurFade delay={0.75} inView>
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
                   {t('home.button')}
               </button>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default Home;