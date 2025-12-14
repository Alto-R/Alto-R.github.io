import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { LayoutGrid } from '../components/layout-grid';
import { Tabs } from '../components/tabs';
import { BlurFade } from '../components/BlurFade';
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
      publicId: image.publicId,  // 传递 publicId，高清图在展开时才渲染
      thumbnail: getCloudinaryUrl(image.publicId, 'thumb'),
      className: image.className || '',
      title,
      description,
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
          <BlurFade delay={0.1} inView>
            {t('gallery.title')}
          </BlurFade>
        </h1>

        {/* Tabs 分类导航 */}
        <Tabs
          tabs={tabsData}
          containerClassName="gallery-tabs-container"
          activeTabClassName="bg-indigo-600/50"
          tabClassName="gallery-tab-button"
          contentClassName="gallery-tabs-content"
          disableContentTransform={true}
        />
      </div>
    </div>
  );
};

export default Gallery;
