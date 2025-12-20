// src/components/ParticlesCityReal.jsx
import { useMemo, useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shanghaiBuildings } from '../data/shanghaiBuildings';

// ========== 城市粒子 Shader ==========
const cityVertexShader = `
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 1.5 * (300.0 / -mvPosition.z);
  }
`;

const cityFragmentShader = `
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 0.8);
  }
`;

// ========== 烟花 Shader ==========
const fireworkVertexShader = `
  uniform float uProgress;
  uniform vec3 uOrigin;
  uniform float uRiseHeight;
  uniform float uScale;

  attribute vec3 velocity;  // 爆开方向
  attribute vec3 color;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;

    vec3 pos = uOrigin;

    if (uProgress < 0.3) {
      // 上升阶段 (0 ~ 0.3)
      float riseT = uProgress / 0.3;
      float ease = 1.0 - pow(1.0 - riseT, 2.0);
      pos.y += uRiseHeight * ease;
      vAlpha = 1.0;
    } else {
      // 爆开阶段 (0.3 ~ 1.0)
      float explodeT = (uProgress - 0.3) / 0.7;
      float ease = 1.0 - pow(1.0 - explodeT, 2.0);

      // 从上升终点开始爆开（根据距离缩放）
      pos.y += uRiseHeight;
      pos += velocity * ease * 45.0 * uScale;

      // 重力效果
      pos.y -= explodeT * explodeT * 20.0 * uScale;

      // 淡出
      vAlpha = 1.0 - explodeT;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 粒子大小（根据距离缩放）
    float size = uProgress < 0.3 ? 3.0 : 2.5;
    gl_PointSize = size * uScale * (300.0 / -mvPosition.z);
  }
`;

const fireworkFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

// ========== 烟花组件 ==========
const Firework = ({ origin, onComplete }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const progressRef = useRef(0);

  // 烟花粒子数量
  const PARTICLE_COUNT = 150;

  // 烟花缩放
  const distanceScale = 1.5;

  // 随机烟花颜色
  const fireworkColor = useMemo(() => {
    const colors = ['#FF69B4', '#00FFFF']; // Hot Pink, Cyan
    return new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  // 生成爆开粒子数据
  const { velocities, colors } = useMemo(() => {
    const velocities = [];
    const colors = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 球形随机方向
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.5 + Math.random() * 0.5;

      velocities.push(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      );

      // 颜色略微变化
      const c = fireworkColor.clone();
      c.offsetHSL(0, 0, (Math.random() - 0.5) * 0.3);
      colors.push(c.r, c.g, c.b);
    }

    return {
      velocities: new Float32Array(velocities),
      colors: new Float32Array(colors)
    };
  }, [fireworkColor]);

  // 占位用的位置数组（都从原点开始，shader里计算实际位置）
  const positions = useMemo(() => {
    return new Float32Array(PARTICLE_COUNT * 3);
  }, []);

  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uOrigin: { value: new THREE.Vector3(origin.x, origin.y, origin.z) },
    uRiseHeight: { value: (30 + Math.random() * 25) * distanceScale },
    uScale: { value: distanceScale }
  }), [origin, distanceScale]);

  useFrame(() => {
    if (!materialRef.current) return;

    progressRef.current += 0.008; // 动画更慢
    materialRef.current.uniforms.uProgress.value = progressRef.current;

    if (progressRef.current >= 1) {
      onComplete?.();
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-velocity"
          count={PARTICLE_COUNT}
          array={velocities}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={fireworkVertexShader}
        fragmentShader={fireworkFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ========== 主组件 ==========
const ParticlesCityReal = () => {
  const mesh = useRef();

  // 用于区分点击和拖动
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // 烟花列表
  const [fireworks, setFireworks] = useState([]);
  const fireworkIdRef = useRef(0);

  // 初始化城市粒子数据
  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];

    const colorDeep = new THREE.Color('#000510');
    const colorBase = new THREE.Color('#1e3a8a');
    const colorMid = new THREE.Color('#15c9d3');
    const colorHigh = new THREE.Color('#bd00ff');
    const colorTop = new THREE.Color('#ffffff');

    const tempColor = new THREE.Color();

    shanghaiBuildings.forEach(point => {
      const { x, y, z } = point;
      const hScale = Math.min(y / 25, 1);

      if (hScale < 0.1) {
        tempColor.lerpColors(colorDeep, colorBase, hScale / 0.1);
      } else if (hScale < 0.45) {
        tempColor.lerpColors(colorBase, colorMid, (hScale - 0.1) / 0.35);
      } else if (hScale < 0.85) {
        tempColor.lerpColors(colorMid, colorHigh, (hScale - 0.45) / 0.5);
      } else {
        tempColor.lerpColors(colorHigh, colorTop, (hScale - 0.85) / 0.05);
      }

      if (Math.random() > 0.15) {
        positions.push(x, y, z);
        colors.push(tempColor.r, tempColor.g, tempColor.b);
      }
    });

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  // 移除完成的烟花
  const removeFirework = useCallback((id) => {
    setFireworks(prev => prev.filter(fw => fw.id !== id));
  }, []);

  // 处理点击事件
  const handlePointerDown = (e) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    const dx = e.clientX - mouseDownPos.current.x;
    const dy = e.clientY - mouseDownPos.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      isDragging.current = true;
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current && e.point) {
      // 在点击位置创建烟花
      const id = fireworkIdRef.current++;
      setFireworks(prev => [...prev, {
        id,
        origin: { x: e.point.x, y: e.point.y, z: e.point.z }
      }]);
    }
  };

  return (
    <group>
      {/* 隐形平面捕获所有点击 */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <planeGeometry args={[600, 600]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* 城市粒子 */}
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={cityVertexShader}
          fragmentShader={cityFragmentShader}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 烟花 */}
      {fireworks.map(fw => (
        <Firework
          key={fw.id}
          origin={fw.origin}
          onComplete={() => removeFirework(fw.id)}
        />
      ))}
    </group>
  );
};

export default ParticlesCityReal;
