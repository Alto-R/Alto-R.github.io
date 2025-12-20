import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import './Dock.css';

export const Dock = ({ children, iconMagnification = 30, iconDistance = 140 }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="dock-container">
      <motion.div
        className="dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { mouseX, iconMagnification, iconDistance })
        )}
      </motion.div>
    </div>
  );
};

export const DockIcon = ({
  children,
  className = '',
  href,
  title,
  mouseX,
  iconMagnification = 30,
  iconDistance = 140,
  ...props
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Calculate distance from mouse to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base size and magnified size
  const baseSize = 48;
  const maxSize = baseSize + iconMagnification;

  // Transform size based on distance
  const sizeTransform = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [baseSize, maxSize, baseSize]
  );

  // Apply spring physics for smooth animation
  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Icon inner size scales proportionally (same ratio as container)
  const baseIconSize = 24;
  const maxIconSize = baseIconSize * (maxSize / baseSize);
  const iconSizeTransform = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [baseIconSize, maxIconSize, baseIconSize]
  );

  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const Component = href ? motion.a : motion.div;
  const additionalProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      ref={ref}
      className={`dock-icon ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...additionalProps}
      {...props}
    >
      <AnimatePresence>
        {hovered && title && (
          <motion.div
            className="dock-tooltip"
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            transition={{ duration: 0.15 }}
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="dock-icon-inner"
        style={{ width: iconSize, height: iconSize }}
      >
        {children}
      </motion.div>
    </Component>
  );
};
