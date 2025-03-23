
import React from 'react';

interface FGTSImageProps {
  className?: string;
}

const FGTSImage: React.FC<FGTSImageProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <img 
        src="https://portalgov.online/fgts-logo.png" 
        alt="FGTS Logo" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default FGTSImage;
