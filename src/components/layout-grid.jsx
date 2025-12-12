"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { getCloudinaryUrl } from '../data/galleryData';

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

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-auto p-10 grid grid-cols-1 md:grid-cols-5 auto-rows-[150px] max-w-[2100px] mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "relative")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden bg-white",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer fixed inset-0 z-50 flex items-center justify-center m-auto"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            // 给展开状态加具体的尺寸约束，保证动画平滑
            style={
              selected?.id === card.id
                ? { width: "90vw", height: "85vh", maxWidth: "1200px" }
                : {}
            }
            layoutId={`gallery-card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            {selected?.id !== card.id && <BlurImage card={card} />}
          </motion.div>
        </div>
      ))}

      {/* 黑色背景遮罩 */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed h-full w-full left-0 top-0 bg-black opacity-0 z-40",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card }) => {
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
};

// 展开后的卡片 - 高清图只在此时才加载
const SelectedCard = ({ selected }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full h-full relative z-[60] flex items-center justify-center rounded-lg shadow-2xl overflow-hidden bg-black"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={getCloudinaryUrl(selected.publicId, 'full')}
          alt={selected.title || `Gallery ${selected.id}`}
          className={cn(
            "max-h-[85vh] max-w-[90vw] object-contain rounded-lg transition-opacity duration-300",
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
