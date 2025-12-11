// src/components/ParticlesCityReal.jsx
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shanghaiBuildings } from '../data/shanghaiBuildings';

// Vertex Shader - 在 GPU 上计算爆炸动画
const vertexShader = `
  uniform float uProgress;
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position;

    // 只在动画进行时计算
    if (uProgress > 0.0) {
      // 爆开方向：从中心向外 + 向上
      vec3 explosionDir = vec3(position.x * 2.0, position.y * 2.0 + 20.0, position.z * 2.0);

      float t;
      float ease;

      if (uProgress <= 1.0) {
        // 爆开阶段 (0 -> 1): easeOut
        t = uProgress;
        ease = 1.0 - pow(1.0 - t, 3.0);
        pos = position + explosionDir * ease;
      } else {
        // 聚拢阶段 (1 -> 2): easeIn
        t = uProgress - 1.0;
        ease = pow(t, 3.0);
        pos = position + explosionDir * (1.0 - ease);
      }
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 根据距离调整点大小
    gl_PointSize = 1.5 * (300.0 / -mvPosition.z);
  }
`;

// Fragment Shader - 渲染颜色
const fragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 0.8);
  }
`;

const ParticlesCityReal = () => {
  const mesh = useRef();
  const materialRef = useRef();

  // 动画状态
  const [exploding, setExploding] = useState(false);
  const explosionProgress = useRef(0);

  // 用于区分点击和拖动
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // 初始化粒子数据（只执行一次）
  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];

    // --- 方案一：经典"夜之城"霓虹 (High-Tech Cyberpunk) ---
    // 核心思路：极深的蓝黑底色，强烈的青色和紫色对比，顶部高亮白光。
    const colorDeep = new THREE.Color('#000510');     // [底部] 极深邃的午夜蓝黑 (让建筑"扎"在地上)
    const colorBase = new THREE.Color('#1e3a8a');     // [低层] 深宝石蓝 (基础结构)
    const colorMid = new THREE.Color('#15c9d3');      // [中层] 高亮电光青 (核心科技感，数据流)
    const colorHigh = new THREE.Color('#bd00ff');     // [高层] 极光紫 (霓虹氛围)
    const colorTop = new THREE.Color('#ffffff');      // [顶端] 纯白炽热电光 (信号塔尖，最亮)

    const tempColor = new THREE.Color();

    shanghaiBuildings.forEach(point => {
      const { x, y, z } = point;

      // 调整了高度梯度，让底部更暗，中间的青色和紫色区域更广
      const hScale = Math.min(y / 25, 1);

      if (hScale < 0.1) {
        // 0-10%: 极深蓝黑 -> 深宝石蓝 (底部基础)
        tempColor.lerpColors(colorDeep, colorBase, hScale / 0.1);
      } else if (hScale < 0.45) {
        // 10-45%: 深宝石蓝 -> 高亮电光青 (迅速变亮，强调科技感)
        tempColor.lerpColors(colorBase, colorMid, (hScale - 0.1) / 0.35);
      } else if (hScale < 0.85) {
        // 45-85%: 高亮电光青 -> 极光紫 (主要视觉区域，冷暖对比)
        tempColor.lerpColors(colorMid, colorHigh, (hScale - 0.45) / 0.5);
      } else {
        // 85-100%: 极光紫 -> 纯白炽热 (顶端高光)
        tempColor.lerpColors(colorHigh, colorTop, (hScale - 0.85) / 0.05);
      }

      // 稍微降低一点密度，让单个粒子更突出，增加通透感
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

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uProgress: { value: 0 }
  }), []);

  // 动画循环 - 只更新一个 uniform 值，不遍历粒子数组
  useFrame(() => {
    if (!materialRef.current) return;

    if (exploding) {
      if (explosionProgress.current < 2) {
        explosionProgress.current += 0.02;
        materialRef.current.uniforms.uProgress.value = explosionProgress.current;
      } else {
        // 动画结束
        setExploding(false);
        explosionProgress.current = 0;
        materialRef.current.uniforms.uProgress.value = 0;
      }
    }
  });

  // 处理点击事件（区分点击和拖动）
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

  const handlePointerUp = () => {
    if (!isDragging.current && !exploding) {
      setExploding(true);
      explosionProgress.current = 0;
    }
  };

  return (
    <points
      ref={mesh}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
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
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticlesCityReal;