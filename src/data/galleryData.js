// Cloudinary 配置
export const cloudinaryConfig = {
  cloudName: 'dj5oohbni',
};

// 照片列表 - 填入具体的 publicId
// className 可选值：
// 宽度: col-span-1 (默认), md:col-span-2 (占2列)
// 高度: row-span-1 (默认), md:row-span-2, md:row-span-3, md:row-span-4 等
// title 和 description 支持中英文切换：{ zh: "中文", en: "English" }
export const galleryImages = [
  { id: 1, publicId: 'P1000456_rj2xtv', className: "md:col-span-3 md:row-span-3", title: { zh: "北京的春", en: "Spring in Beijing" }, description: { zh: "", en: "" } },
  { id: 2, publicId: 'P1046525_zwyazi', className: "md:col-span-2 md:row-span-3", title: { zh: "春天的博雅塔", en: "Boya Tower in Spring" }, description: { zh: "", en: "" } },
  { id: 3, publicId: 'P1025301_rjujd7', className: "md:col-span-2 md:row-span-3", title: { zh: "未名湖畔打鸟", en: "Bird Watching by Weiming Lake" }, description: { zh: "", en: "" } },
  { id: 5, publicId: 'P1000466_en8svt', className: "md:col-span-3 md:row-span-3", title: { zh: "太庙", en: "Taimiao Temple" }, description: { zh: "", en: "" } },
  { id: 6, publicId: 'P1024105_fuwwu3', className: "md:col-span-2 md:row-span-3", title: { zh: "从景山看故宫", en: "Forbidden City from Jingshan" }, description: { zh: "", en: "" } },
  { id: 7, publicId: 'P1046210_leo8al', className: "md:col-span-3 md:row-span-3", title: { zh: "颐和园", en: "Summer Palace" }, description: { zh: "", en: "" } },
  { id: 8, publicId: 'P1035200_aep2fp', className: "md:col-span-2 md:row-span-3", title: { zh: "未名湖的冬天", en: "Winter at Weiming Lake" }, description: { zh: "", en: "" } },
  { id: 9, publicId: 'P1035232_jpm9nk', className: "md:col-span-2 md:row-span-3", title: { zh: "湖面结冰", en: "Frozen Lake" }, description: { zh: "", en: "" } },

  { id: 12, publicId: 'P1036275_xsm1xp', className: "md:col-span-2 md:row-span-3", title: { zh: "苏州", en: "Suzhou" }, description: { zh: "", en: "" } },
  { id: 13, publicId: 'P1012377_vpxneb', className: "md:col-span-3 md:row-span-3", title: { zh: "深圳湾公园", en: "Shenzhen Bay Park" }, description: { zh: "", en: "" } },
  { id: 14, publicId: 'P1025666_lm9mtr', className: "md:col-span-5 md:row-span-2", title: { zh: "香港", en: "Hong Kong" }, description: { zh: "", en: "" } },
  { id: 15, publicId: 'P1025667_er6qez', className: "md:col-span-5 md:row-span-3", title: { zh: "香港赤柱", en: "Stanley, Hong Kong" }, description: { zh: "", en: "" } },

  { id: 16, publicId: 'P1063041_h0hmef', className: "md:col-span-2 md:row-span-4", title: { zh: "下午的涩谷sky", en: "Shibuya Sky in Afternoon" }, description: { zh: "", en: "" } },
  { id: 17, publicId: 'P1063095_yldoyu', className: "md:col-span-2 md:row-span-4", title: { zh: "晚上的涩谷sky", en: "Shibuya Sky at Night" }, description: { zh: "", en: "" } },
  { id: 18, publicId: 'P1063047_zmom6v', className: "md:col-span-5 md:row-span-3", title: { zh: "涩谷sky顶层", en: "Shibuya Sky Rooftop" }, description: { zh: "", en: "" } },
  { id: 19, publicId: 'P1063043_msfckf', className: "md:col-span-2 md:row-span-4", title: { zh: "东京塔", en: "Tokyo Tower" }, description: { zh: "", en: "" } },
  { id: 20, publicId: 'P1023467_ze8ill', className: "md:col-span-3 md:row-span-4", title: { zh: "新宿", en: "Shinjuku" }, description: { zh: "", en: "" } },
  { id: 22, publicId: 'P1062025_izdug5', className: "md:col-span-5 md:row-span-3", title: { zh: "大阪道顿堀", en: "Dotonbori, Osaka" }, description: { zh: "", en: "" } },
  { id: 23, publicId: 'P1062091_d7ai9t', className: "md:col-span-3 md:row-span-3", title: { zh: "奈良法隆寺", en: "Horyu-ji Temple, Nara" }, description: { zh: "", en: "" } },
  { id: 24, publicId: 'P1062241_el96k8', className: "md:col-span-2 md:row-span-3", title: { zh: "奈良公园", en: "Nara Park" }, description: { zh: "", en: "" } },
  { id: 25, publicId: 'P1062189_qc1avg', className: "md:col-span-2 md:row-span-3", title: { zh: "奈良的🦌", en: "Deer in Nara" }, description: { zh: "", en: "" } },
  { id: 26, publicId: 'P1062700_t47f51', className: "md:col-span-3 md:row-span-3", title: { zh: "宇治大吉山", en: "Mt. Daikichi, Uji" }, description: { zh: "", en: "" } },
  { id: 27, publicId: 'P1073391_cehylj', className: "md:col-span-5 md:row-span-3", title: { zh: "镰仓", en: "Kamakura" }, description: { zh: "", en: "" } },
];

// 生成 Cloudinary URL 的工具函数
// f_auto: 自动转换格式 (webp/avif)，体积减少约 50%
// q_auto: 自动压缩质量，肉眼几乎看不出区别
export const getCloudinaryUrl = (publicId, type = 'thumb') => {
  if (type === 'thumb') {
    // 缩略图：小尺寸，快速加载
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto,w_400/${publicId}`;
  } else {
    // 高清图：展开后查看，限制最大宽度
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto,w_1600/${publicId}`;
  }
};

// 照片分类配置
export const galleryCategories = {
  nature: { ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: { zh: '北京', en: 'Beijing' } },
  humanity: { ids: [12, 13, 14, 15], label: { zh: '其他城市', en: 'Other cities' } },
  urban: { ids: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], label: { zh: '日本', en: 'Japan' } },
};

// 按分类获取照片
export const getImagesByCategory = (category) => {
  const categoryConfig = galleryCategories[category];
  if (!categoryConfig) return [];
  return galleryImages.filter(img => categoryConfig.ids.includes(img.id));
};

// 辅助函数：根据语言获取本地化文本
export const getLocalizedText = (textObj, locale = 'zh') => {
  if (typeof textObj === 'string') return textObj;
  return textObj[locale] || textObj.zh || '';
};
