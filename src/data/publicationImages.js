// 论文配图（中英文共用，按 publications 的 id 索引）
// 放在这里而不是 locales/*.json，避免中英两份数据各维护一次导致不同步。
// id 3（车顶光伏）尚未发表，暂不配图，卡片会渲染占位框。
const sources = {
  1: 'https://res.cloudinary.com/dj5oohbni/image/upload/v1787156766/fig1_1_vstwbo.png',
  2: 'https://res.cloudinary.com/dj5oohbni/image/upload/v1787156532/1-s2.0-S1361920925001683-gr7_lrg_mstuml.jpg',
  4: 'https://res.cloudinary.com/dj5oohbni/image/upload/v1787156481/1-s2.0-S0141938226002714-gr2_lrg_mfxhkz.jpg',
};

// 插入 Cloudinary 变换参数：自动选格式（WebP/AVIF）、自动压缩、限制宽度
const withTransform = (url, width) =>
  url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`);

export const getPublicationImage = (id, width = 800) =>
  sources[id] ? withTransform(sources[id], width) : null;
