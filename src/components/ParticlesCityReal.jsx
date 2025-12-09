// src/components/ParticlesCityReal.jsx
import { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shanghaiBuildings } from '../data/shanghaiBuildings'; // 使用预处理的静态数据

const ParticlesCityReal = () => {
  const mesh = useRef();
  const { gl } = useThree();

  // 爆开动画状态
  const [exploding, setExploding] = useState(false);
  const explosionProgress = useRef(0);

  // 用于区分点击和拖动
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // 保存原始位置和目标位置
  const { positions, colors, originalPositions } = useMemo(() => {
    const positions = [];
    const colors = [];
    const originalPositions = [];

    // 霓虹赛博朋克配色
    const colorBottom = new THREE.Color('#4c1d95'); // 深紫
    const colorMid = new THREE.Color('#ec4899');    // 品红
    const colorTop = new THREE.Color('#06b6d4');    // 青蓝
    const tempColor = new THREE.Color();

    // 直接使用预处理好的点位置
    shanghaiBuildings.forEach(point => {
      const { x, y, z } = point;

      // 根据高度计算颜色（深紫→品红→青蓝）
      const hScale = y / 10;
      if (hScale < 0.5) {
        tempColor.lerpColors(colorBottom, colorMid, hScale * 2);
      } else {
        tempColor.lerpColors(colorMid, colorTop, (hScale - 0.5) * 2);
      }

      // 95%概率显示（随机熄灯效果）
      if (Math.random() > 0.05) {
        positions.push(x, y, z);
        originalPositions.push(x, y, z); // 保存原始位置
        colors.push(tempColor.r, tempColor.g, tempColor.b);
      }
    });

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      originalPositions: new Float32Array(originalPositions)
    };
  }, []); // 空依赖数组，颜色固定

  // 爆开动画
  useFrame(() => {
    if (!mesh.current || !exploding) return;

    const posArray = mesh.current.geometry.attributes.position.array;

    if (explosionProgress.current < 1) {
      // 爆开阶段 (0 -> 1)
      explosionProgress.current += 0.02;

      for (let i = 0; i < posArray.length; i += 3) {
        const origX = originalPositions[i];
        const origY = originalPositions[i + 1];
        const origZ = originalPositions[i + 2];

        // 爆开方向：从中心向外
        const dirX = origX * 2;
        const dirY = origY * 2 + 20; // 向上爆开
        const dirZ = origZ * 2;

        // 使用缓动函数
        const t = explosionProgress.current;
        const easeOut = 1 - Math.pow(1 - t, 3);

        posArray[i] = origX + dirX * easeOut;
        posArray[i + 1] = origY + dirY * easeOut;
        posArray[i + 2] = origZ + dirZ * easeOut;
      }

    } else if (explosionProgress.current < 2) {
      // 聚拢阶段 (1 -> 2)
      explosionProgress.current += 0.02;

      for (let i = 0; i < posArray.length; i += 3) {
        const origX = originalPositions[i];
        const origY = originalPositions[i + 1];
        const origZ = originalPositions[i + 2];

        const dirX = origX * 2;
        const dirY = origY * 2 + 20;
        const dirZ = origZ * 2;

        // 从爆开状态回到原位
        const t = explosionProgress.current - 1;
        const easeIn = Math.pow(t, 3);

        posArray[i] = origX + dirX * (1 - easeIn);
        posArray[i + 1] = origY + dirY * (1 - easeIn);
        posArray[i + 2] = origZ + dirZ * (1 - easeIn);
      }

    } else {
      // 动画结束，重置状态
      setExploding(false);
      explosionProgress.current = 0;

      // 恢复原始位置
      for (let i = 0; i < posArray.length; i++) {
        posArray[i] = originalPositions[i];
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
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
    // 只有在没有拖动的情况下才触发爆开
    if (!isDragging.current && !exploding) {
      setExploding(true);
      explosionProgress.current = 0;
    }
  };

  // 取消自动旋转动画
  // useFrame((state) => {
  //   if (mesh.current) {
  //     const time = state.clock.getElapsedTime();
  //     mesh.current.rotation.y = time * 0.02;
  //   }
  // });

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
      <pointsMaterial
        size={0.8}
        vertexColors={true}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticlesCityReal;