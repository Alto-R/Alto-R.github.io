// src/components/ParticlesWave.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticlesWave = ({ count = 5000 }) => {
  // 获取 mesh 的引用，以便在每一帧中操作它
  const mesh = useRef();
  
  // 用于动画的时间累加器
  let time = 0;

  // useMemo: 仅在组件首次渲染时计算粒子的初始位置
  const particlesPosition = useMemo(() => {
    // 创建一个 Float32Array 来存储所有点的位置数据 (x, y, z)
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // x, z 在一个平面区域内随机分布
      const x = (Math.random() - 0.5) * 20; // 范围 -10 到 10
      const z = (Math.random() - 0.5) * 20; // 范围 -10 到 10
      const y = 0; // 初始平面是扁平的

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    // 创建 BufferAttribute，这是 Three.js 处理大量数据的方式
    return new THREE.BufferAttribute(positions, 3);
  }, [count]);

  // useFrame: R3F 的核心 hook，相当于 requestAnimationFrame
  // 这个函数里的代码会在每一帧运行（通常是 60fps）
  useFrame((state) => {
    time += 0.01; // 增加时间变量

    // 获取当前几何体的所有位置数据
    const { array } = mesh.current.geometry.attributes.position;

    // 遍历每一个粒子
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = array[i3];
      const z = array[i3 + 2];

      // 核心算法：利用正弦和余弦函数创造波浪
      // y 坐标随时间(time)以及粒子的 x 和 z 坐标变化
      // 这里的参数 (如 0.5, 0.3) 可以调整波浪的频率和幅度
      array[i3 + 1] = 
        Math.sin(x * 0.5 + time) * 0.5 + 
        Math.cos(z * 0.3 + time * 0.8) * 0.5;
    }

    // 告诉 Three.js 位置数据已经更新，需要重新渲染
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // 可选：让整个粒子群缓慢旋转
    // mesh.current.rotation.y = time * 0.05;
  });

  return (
    // <points> 是 Three.js 的 Points 对象
    <points ref={mesh}>
      {/* bufferGeometry 是用于存储大量顶点数据的几何体 */}
      <bufferGeometry>
        {/* attach="attributes-position" 将我们上面计算的数据绑定到几何体的位置属性上 */}
        <bufferAttribute attach="attributes-position" {...particlesPosition} />
      </bufferGeometry>
      
      {/* pointsMaterial 是粒子的材质 */}
      <pointsMaterial
        size={0.05} // 粒子大小
        color="#4fa1ff" // 粒子颜色 (浅蓝色)
        sizeAttenuation={true} // 近大远小效果
        transparent={true} // 允许透明
        opacity={0.8} // 透明度
        blending={THREE.AdditiveBlending} // 发光叠加效果
      />
    </points>
  );
};

export default ParticlesWave;