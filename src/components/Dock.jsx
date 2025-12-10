import React, { useRef } from 'react';
import './Dock.css';

export const Dock = ({ children, iconMagnification = 60, iconDistance = 100 }) => {
  return (
    <div className="dock-container">
      <div
        className="dock"
        style={{
          '--icon-magnification': iconMagnification,
          '--icon-distance': iconDistance
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const DockIcon = ({ children, className = '', href, ...props }) => {
  const Component = href ? 'a' : 'div';
  const additionalProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      className={`dock-icon ${className}`}
      {...additionalProps}
      {...props}
    >
      {children}
    </Component>
  );
};
