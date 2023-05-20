import React from 'react'
import "./style.css"

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="wave-animation"></div>
        <div className="wave-animation"></div>
        <div className="wave-animation"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

