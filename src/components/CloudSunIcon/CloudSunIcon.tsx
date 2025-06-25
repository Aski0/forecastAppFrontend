import React, { useRef } from 'react';
import './CloudSunIcon.scss';

const CloudSunIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;

    container.style.setProperty('--move-x', `${x}px`);
    container.style.setProperty('--move-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty('--move-x', `0px`);
      container.style.setProperty('--move-y', `0px`);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`cloud-sun-icon ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sun"></div>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
    </div>
  );
};

export default CloudSunIcon;
