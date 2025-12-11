import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  intervalRef,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const scrambleIntervalRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  useEffect(() => {
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
  }, [text, encryptSpeed, revealDelayMs]);

  return (
    <motion.span
      className={`${className} ${
        isEncrypted ? encryptedClassName : revealedClassName
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};
