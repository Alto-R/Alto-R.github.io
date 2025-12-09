// src/components/ParticlesCity.jsx
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticlesCity = () => {
  const mesh = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    
    // 1. 城市参数
    const gridSize = 80;      // 城市范围扩大
    const unitSize = 0.5;     // 粒子间距（越小越密）
    const buildingGap = 2;    // 建筑之间的间隔
    
    // 颜色配置 (RGB)
    const colorBottom = new THREE.Color('#1e1b4b'); // 深蓝紫 (底部)
    const colorTop = new THREE.Color('#22d3ee');    // 赛博青 (顶部)
    const colorHigh = new THREE.Color('#ffffff');   // 亮白 (塔尖)

    // 辅助对象用于计算颜色插值
    const tempColor = new THREE.Color();

    // 2. 遍历地块 (以 block 为单位)
    for (let x = -gridSize; x <= gridSize; x += buildingGap) {
      for (let z = -gridSize; z <= gridSize; z += buildingGap) {
        
        // --- A. 城市规划算法 (Roads) ---
        
        // 留出“主干道” (十字形)
        if (Math.abs(x) < 4 || Math.abs(z) < 4) continue;

        // 留出“街区道路” (每隔 20 个单位切一条路)
        if (Math.abs(x) % 20 < 2 || Math.abs(z) % 20 < 2) continue;

        // --- B. 建筑高度逻辑 ---
        
        // 距离中心的距离
        const dist = Math.sqrt(x*x + z*z);
        // 归一化距离 (0~1)，中心为0
        const distNorm = dist / gridSize;
        
        // 柏林噪声模拟或简单的概率分布
        // 中心高，边缘低，但保留一些随机性
        let heightLimit = Math.max(1, (1 - distNorm) * 20); 
        
        // 随机削减一些楼的高度，制造错落感
        if (Math.random() > 0.3) heightLimit *= Math.random();
        
        // 只有 60% 的地基会长出楼
        if (Math.random() > 0.4) {
          
          // --- C. 构建单栋楼 (Voxels) ---
          const storeys = Math.floor(heightLimit * 3); // 楼层数
          
          for (let y = 0; y < storeys; y++) {
            // 每一层我们放 4 个点，形成一个柱状结构，而不是单点
            // 这样看起来更像“实体建筑”
            
            // 这一层的相对高度 (0~1)
            const hScale = y / 40; 

            // 计算颜色：根据高度插值
            if (hScale < 0.8) {
               tempColor.lerpColors(colorBottom, colorTop, hScale);
            } else {
               tempColor.lerpColors(colorTop, colorHigh, (hScale - 0.8) * 5);
            }

            // 建筑的四个角 (增加体积感)
            const offsets = [
              { dx: 0, dz: 0 },
              { dx: 0.5, dz: 0 },
              { dx: 0, dz: 0.5 },
              { dx: 0.5, dz: 0.5 }
            ];

            offsets.forEach(offset => {
               // 只有外立面即使被随机剔除一点也不影响整体感
               // 这里我们简单地全部添加，或者随机剔除模拟“熄灯的窗户”
               if (Math.random() > 0.1) {
                  positions.push(
                    x + offset.dx, 
                    y * 0.4, // 层高
                    z + offset.dz
                  );
                  colors.push(tempColor.r, tempColor.g, tempColor.b);
               }
            });
          }
        }
      }
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  // 动画：缓慢旋转
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.02; // 转慢一点，显着巨物感
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
        />
        {/* 关键：注入颜色属性 */}
        <bufferAttribute 
          attach="attributes-color" 
          count={colors.length / 3} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        // color="#00ffff" // 不需要统一颜色了，因为我们要用 vertexColors
        vertexColors={true} // 开启顶点颜色！
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticlesCity;