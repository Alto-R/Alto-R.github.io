import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

export const EncryptedText = ({
  text,
  className = "",
  encryptedClassName = "text-neutral-500",
  revealedClassName = "dark:text-white text-black",
  revealDelayMs = 50,
  encryptSpeed = SHUFFLE_TIME,
  triggerOnView = true, // 新增：是否在滚动到视口时才触发动画
  viewThreshold = 0.3,  // 新增：触发阈值（元素可见比例）
  triggerOnce = true,   // 新增：是否只触发一次
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevTextRef = useRef(text);
  const scrambleIntervalRef = useRef(null);
  const revealTimeoutRef = useRef(null);
  const elementRef = useRef(null);

  // 使用 framer-motion 的 useInView hook
  const isInView = useInView(elementRef, {
    amount: viewThreshold,
    once: false // 不使用 once，手动控制
  });

  // 当 text 变化时（如语言切换），重置动画状态
  useEffect(() => {
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      setHasAnimated(false);
      setIsEncrypted(true);
      setDisplayText(text);
    }
  }, [text]);

  useEffect(() => {
    // 如果需要在视口内触发，且元素不在视口内，则不执行
    if (triggerOnView && !isInView) return;
    // 如果只触发一次且已经动画过了，则不执行
    if (triggerOnce && hasAnimated) return;

    // Start encryption animation
    const scramble = () => {
      let pos = 0;

      scrambleIntervalRef.current = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (pos / CYCLES_PER_LETTER > index) {
              return char;
            }

            const randomCharIndex = Math.floor(Math.random() * CHARS.length);
            const randomChar = CHARS[randomCharIndex];

            return randomChar;
          })
          .join("");

        setDisplayText(scrambled);
        pos++;

        if (pos >= text.length * CYCLES_PER_LETTER) {
          stopScramble();
        }
      }, encryptSpeed);
    };

    const stopScramble = () => {
      clearInterval(scrambleIntervalRef.current);
      setDisplayText(text);
      setIsEncrypted(false);
      setHasAnimated(true);
    };

    // Delay before starting reveal animation
    revealTimeoutRef.current = setTimeout(() => {
      scramble();
    }, revealDelayMs);

    // Cleanup
    return () => {
      clearInterval(scrambleIntervalRef.current);
      clearTimeout(revealTimeoutRef.current);
    };
  }, [text, encryptSpeed, revealDelayMs, isInView, triggerOnView, triggerOnce, hasAnimated]);

  return (
    <motion.span
      ref={elementRef}
      className={`${className} will-change-[opacity] ${
        isEncrypted ? encryptedClassName : revealedClassName
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView || !triggerOnView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};
