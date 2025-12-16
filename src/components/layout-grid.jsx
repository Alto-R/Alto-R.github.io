"use client";
import React, { useState, useEffect, memo, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { getCloudinaryUrl } from '../data/galleryData';

// 单个卡片组件 - 使用 React.memo 避免不必要的重渲染
const GridCard = memo(({ card, isSelected, isLastSelected, onClick }) => {
  return (
    <div className={cn(card.className, "relative")}>
      <motion.div
        onClick={onClick}
        className={cn(
          "relative overflow-hidden bg-white",
          isSelected
            ? "rounded-lg cursor-pointer fixed inset-0 z-[9999] flex items-center justify-center m-auto w-[85vw] h-[65vh] md:w-[90vw] md:h-[85vh] md:max-w-[1200px] max-w-[500px]"
            : isLastSelected
            ? "z-40 bg-white rounded-xl h-full w-full"
            : "bg-white rounded-xl h-full w-full"
        )}
        layoutId={`gallery-card-${card.id}`}
      >
        {isSelected && <SelectedCard selected={card} />}
        {!isSelected && <BlurImage card={card} />}
      </motion.div>
    </div>
  );
}, (prevProps, nextProps) => {
  // 自定义对比：只有选中状态变化时才重渲染
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isLastSelected === nextProps.isLastSelected &&
    prevProps.card.id === nextProps.card.id
  );
});

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  // 当 cards 更新时（如语言切换），同步更新 selected 状态
  useEffect(() => {
    if (selected) {
      const updatedCard = cards.find(card => card.id === selected.id);
      if (updatedCard) {
        setSelected(updatedCard);
      }
    }
  }, [cards]);

  const handleClick = useCallback((card) => {
    setLastSelected(selected);
    setSelected(card);
  }, [selected]);

  const handleOutsideClick = useCallback(() => {
    setLastSelected(selected);
    setSelected(null);
  }, [selected]);

  return (
    <div className="w-full h-auto p-10 grid grid-cols-1 md:grid-cols-5 auto-rows-[150px] max-w-[2100px] mx-auto gap-4 relative">
      {cards.map((card) => (
        <GridCard
          key={card.id}
          card={card}
          isSelected={selected?.id === card.id}
          isLastSelected={lastSelected?.id === card.id}
          onClick={() => handleClick(card)}
        />
      ))}

      {/* 黑色背景遮罩 */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed h-full w-full left-0 top-0 bg-black opacity-0 z-[9998]",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

// 缩略图组件 - 使用 memo 优化
const BlurImage = memo(({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={card.thumbnail}
      onLoad={() => setLoaded(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-top transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt={card.title || "thumbnail"}
      loading="lazy"
    />
  );
});

// 展开后的卡片 - 高清图只在此时才加载
const SelectedCard = ({ selected }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full h-full relative z-[60] flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center expanded-image-style overflow-hidden bg-black">
        <img
          src={getCloudinaryUrl(selected.publicId, 'full')}
          alt={selected.title || `Gallery ${selected.id}`}
          className={cn(
            "max-h-[60vh] max-w-[85vw] md:max-h-[85vh] md:max-w-[90vw] object-contain transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
        />
        {/* 加载占位 */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        {/* 左下角文字 */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-2xl font-bold mb-1">{selected.title}</h3>
          <p className="text-sm text-white/70">{selected.description}</p>
        </div>
      </div>
    </motion.div>
  );
};
