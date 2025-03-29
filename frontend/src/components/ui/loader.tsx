import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  className = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const loaderContent = (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-pulse"></div>
      {/* Spinning ring */}
      <div className="absolute inset-0 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
      {/* Inner dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          {loaderContent}
          <p className="text-sm text-white/80 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loaderContent}
    </div>
  );
};

export default Loader; 