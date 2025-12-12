"use client";;
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  disableContentTransform = false,
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);

  // 当 propTabs 更新时（如语言切换），同步更新内部状态
  useEffect(() => {
    // 保持当前选中的 tab，找到新 propTabs 中对应的 tab
    const currentActiveValue = active?.value;
    const newActiveTab = propTabs.find(tab => tab.value === currentActiveValue) || propTabs[0];

    // 重新排列 tabs，保持当前选中的在前面
    const newTabs = [...propTabs];
    const activeIndex = newTabs.findIndex(tab => tab.value === currentActiveValue);
    if (activeIndex > 0) {
      const selectedTab = newTabs.splice(activeIndex, 1);
      newTabs.unshift(selectedTab[0]);
    }

    setTabs(newTabs);
    setActive(newActiveTab);
  }, [propTabs]);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}>
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}>
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
                  activeTabClassName
                )} />
            )}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        disableTransform={disableContentTransform}
        className={cn("mt-32", contentClassName)} />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
  disableTransform = false,
}) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };

  // 当禁用 transform 时，使用简化的淡入淡出切换
  if (disableTransform) {
    return (
      <div className={cn("relative w-full", className)}>
        {tabs.map((tab) => (
          <motion.div
            key={tab.value}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isActive(tab) ? 1 : 0,
              display: isActive(tab) ? 'block' : 'none',
            }}
            transition={{ duration: 0.3 }}
            className="w-full">
            {tab.content}
          </motion.div>
        ))}
      </div>
    );
  }

  // 原始实现 - 带 transform 动画
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}>
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
