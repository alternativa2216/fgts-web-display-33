
import React from 'react';
import FGTSImage from './FGTSImage';

interface FGTSLogoProps {
  className?: string;
}

const FGTSLogo: React.FC<FGTSLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <FGTSImage className="w-64" />
    </div>
  );
};

export default FGTSLogo;
