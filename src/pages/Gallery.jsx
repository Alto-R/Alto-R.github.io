import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { LayoutGrid } from '../components/layout-grid';
import { Tabs } from '../components/tabs';
import { EncryptedText } from '../components/encrypted-text';
import {
  galleryCategories,
  getImagesByCategory,
  getCloudinaryUrl,
  getLocalizedText
} from '../data/galleryData';
import './Gallery.css';

// 将图片数据转换为 LayoutGrid cards 格式
const createCards = (images, locale) => {
  return images.map((image) => {
    const title = getLocalizedText(image.title, locale);
    const description = getLocalizedText(image.description, locale);
    return {
      id: image.id,
      thumbnail: getCloudinaryUrl(image.publicId, { width: 800, quality: 80 }),
      className: image.className || '',
      content: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* 图片 */}
          <img
            src={getCloudinaryUrl(image.publicId, { width: 1600, quality: 85 })}
            alt={title || `Gallery ${image.id}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
          {/* 左下角文字 */}
          <div className="absolute bottom-4 left-4 text-white z-10">
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <p className="text-sm text-white/70">{description}</p>
          </div>
        </div>
      ),
    };
  });
};

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  // 为每个分类创建 Tab 配置
  const tabsData = useMemo(() => {
    return Object.keys(galleryCategories).map((categoryKey) => ({
      title: getLocalizedText(galleryCategories[categoryKey].label, locale),
      value: categoryKey,
      content: (
        <div className="gallery-grid-container">
          <LayoutGrid cards={createCards(getImagesByCategory(categoryKey), locale)} />
        </div>
      ),
    }));
  }, [locale]);

  return (
    <div className="page-container">
      <div className="content-wrapper gallery-content">
        <h1 className="page-title">
          <EncryptedText
            text={t('gallery.title')}
            encryptedClassName="text-neutral-500"
            revealedClassName=""
            revealDelayMs={10}
            encryptSpeed={15}
          />
        </h1>

        {/* Tabs 分类导航 */}
        <Tabs
          tabs={tabsData}
          containerClassName="gallery-tabs-container"
          activeTabClassName="bg-indigo-500/20"
          tabClassName="gallery-tab-button"
          contentClassName="gallery-tabs-content"
          disableContentTransform={true}
        />
      </div>
    </div>
  );
};

export default Gallery;
