// scripts/processBuildings.js
// 这个脚本将 GeoJSON 预处理为静态坐标数据
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 GeoJSON 文件
const geojsonPath = path.join(__dirname, '../data/shanghai_buildings_merged.geojson');
const buildingGeoJSON = JSON.parse(fs.readFileSync(geojsonPath, 'utf-8'));

function processBuildingData() {
  const points = []; // 直接存储最终的点位置

  // 保留所有区的建筑
  const filteredFeatures = buildingGeoJSON.features;

  console.log(`总建筑数: ${buildingGeoJSON.features.length}`);

  // 计算经纬度范围（用于归一化坐标）
  let minLon = Infinity, maxLon = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;

  filteredFeatures.forEach(feature => {
    if (feature.geometry.type === 'Polygon') {
      feature.geometry.coordinates[0].forEach(([lon, lat]) => {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      });
    }
  });

  const centerLon = (minLon + maxLon) / 2;
  const centerLat = (minLat + maxLat) / 2;

  // 缩放系数（调整城市在3D空间中的大小）
  const scale = 800;

  // ========== 相机可视范围裁剪配置 ==========
  // 相机配置 (来自 Home.jsx):
  // - 位置: [-180, 60, 30], 到原点水平距离约 182
  // - FOV: 60度
  // - 雾气: 从300开始到600完全消失
  // - 自动旋转360度绕Y轴
  //
  // 激进裁剪：只保留视觉核心区域
  // 相机水平距离182，雾气从300开始变淡，取 250 作为有效可视范围
  const CAMERA_VIEW_RADIUS = 250; // 从原点的最大水平可视距离（激进）
  const MAX_VISIBLE_HEIGHT = 100; // Y方向最大可视高度（相机高度60，再往上看不清）

  console.log('处理建筑数据...');
  console.log(`经度范围: ${minLon.toFixed(6)} - ${maxLon.toFixed(6)}`);
  console.log(`纬度范围: ${minLat.toFixed(6)} - ${maxLat.toFixed(6)}`);
  console.log(`中心点: (${centerLon.toFixed(6)}, ${centerLat.toFixed(6)})`);

  // 使用 Map 来合并相近的点（去重）
  const pointMap = new Map();
  const gridSize = 2; // 网格大小：相邻建筑距离小于此值会合并（可调整：2-5）

  // 统计裁剪信息
  let culledCount = 0;
  let processedCount = 0;

  // 为每栋建筑生成最终的显示点
  filteredFeatures.forEach(feature => {
    if (feature.geometry.type !== 'Polygon') return;

    const height = feature.properties.height || 2;
    const coords = feature.geometry.coordinates[0];

    // 计算建筑中心点
    let centerX = 0, centerZ = 0;
    coords.forEach(([lon, lat]) => {
      centerX += lon;
      centerZ += lat;
    });
    centerX = (centerX / coords.length - centerLon) * scale;
    centerZ = (centerZ / coords.length - centerLat) * scale;

    // ========== 相机可视范围裁剪 ==========
    // 计算建筑到原点的水平距离（XZ平面）
    const distanceFromOrigin = Math.sqrt(centerX * centerX + centerZ * centerZ);

    // 如果建筑超出可视范围，跳过
    if (distanceFromOrigin > CAMERA_VIEW_RADIUS) {
      culledCount++;
      return;
    }
    processedCount++;

    // 量化到网格（用于合并相近建筑）
    const gridX = Math.round(centerX / gridSize) * gridSize;
    const gridZ = Math.round(centerZ / gridSize) * gridSize;

    // 稀疏化策略：每N层取一个点
    const floorHeight = 3; // 每层3米
    const samplingInterval = 2; // 每2层取一个点（可调整：2=每隔一层，3=每隔两层）
    const totalFloors = Math.max(1, Math.ceil(height / floorHeight));

    // 采样生成点：不是每层都生成，而是间隔取样
    for (let floor = 0; floor < totalFloors; floor += samplingInterval) {
      const y = floor * (floorHeight / 3); // 在3D空间中，每层的高度缩放

      // 高度裁剪：超出可视高度的点不生成
      if (y > MAX_VISIBLE_HEIGHT) break;

      const gridY = Math.round(y * 10) / 10; // y方向精度保持0.1

      // 使用网格坐标作为key，实现空间去重
      const key = `${gridX}_${gridY}_${gridZ}`;

      // 如果该网格位置已有点，保留高度更大的建筑
      if (!pointMap.has(key) || pointMap.get(key).height < height) {
        pointMap.set(key, {
          x: Number(gridX.toFixed(1)),
          y: Number(gridY.toFixed(1)),
          z: Number(gridZ.toFixed(1)),
          height: height
        });
      }
    }
  });

  // 从Map中提取所有去重后的点
  pointMap.forEach(point => {
    points.push({
      x: point.x,
      y: point.y,
      z: point.z
    });
  });

  console.log(`\n========== 相机可视范围裁剪统计 ==========`);
  console.log(`可视半径: ${CAMERA_VIEW_RADIUS}, 最大高度: ${MAX_VISIBLE_HEIGHT}`);
  console.log(`保留建筑数: ${processedCount}`);
  console.log(`裁剪建筑数: ${culledCount} (${(culledCount / filteredFeatures.length * 100).toFixed(1)}%)`);
  console.log(`去重前预估点数: ${processedCount * 5} (约)`);
  console.log(`去重后实际点数: ${points.length}`);

  // 计算并输出数据的边界范围
  let minX = Infinity, maxX = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  points.forEach(p => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minZ = Math.min(minZ, p.z);
    maxZ = Math.max(maxZ, p.z);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });

  console.log(`\n数据范围统计:`);
  console.log(`X 范围: ${minX.toFixed(1)} 到 ${maxX.toFixed(1)} (中心: ${((minX + maxX) / 2).toFixed(1)})`);
  console.log(`Y 范围: ${minY.toFixed(1)} 到 ${maxY.toFixed(1)} (最高: ${maxY.toFixed(1)}米)`);
  console.log(`Z 范围: ${minZ.toFixed(1)} 到 ${maxZ.toFixed(1)} (中心: ${((minZ + maxZ) / 2).toFixed(1)})`);

  // 找出最高的建筑及其位置
  let maxBuildingHeight = 0;
  let tallestBuildingPos = { x: 0, z: 0 };

  filteredFeatures.forEach(feature => {
    if (feature.geometry.type !== 'Polygon') return;

    const height = feature.properties.height || 2;
    if (height > maxBuildingHeight) {
      maxBuildingHeight = height;
      const coords = feature.geometry.coordinates[0];
      let centerX = 0, centerZ = 0;
      coords.forEach(([lon, lat]) => {
        centerX += lon;
        centerZ += lat;
      });
      centerX = (centerX / coords.length - centerLon) * scale;
      centerZ = (centerZ / coords.length - centerLat) * scale;
      tallestBuildingPos = { x: centerX, z: centerZ };
    }
  });

  console.log(`\n最高建筑统计:`);
  console.log(`高度: ${maxBuildingHeight.toFixed(1)}米`);
  console.log(`位置: (${tallestBuildingPos.x.toFixed(1)}, ${tallestBuildingPos.z.toFixed(1)})`);

  return points;
}

// 处理数据
const buildings = processBuildingData();

// 写入 JavaScript 文件（更小，更快）
const outputJsPath = path.join(__dirname, '../src/data/shanghaiBuildings.js');
const jsContent = `// 自动生成的上海建筑数据
// 生成时间: ${new Date().toISOString()}
// 建筑数量: ${buildings.length}

export const shanghaiBuildings = ${JSON.stringify(buildings, null, 0)};
`;

// 确保目录存在
const outputDir = path.dirname(outputJsPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputJsPath, jsContent, 'utf-8');

console.log(`\n✅ 成功处理 ${buildings.length} 栋建筑`);
console.log(`📁 输出文件: ${outputJsPath}`);
console.log(`📦 文件大小: ${(fs.statSync(outputJsPath).size / 1024).toFixed(2)} KB`);