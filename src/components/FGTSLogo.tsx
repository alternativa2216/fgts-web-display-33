
import React from 'react';

interface FGTSLogoProps {
  className?: string;
}

const FGTSLogo: React.FC<FGTSLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="text-white text-6xl font-bold tracking-wider flex gap-0">
        <div className="flex items-center justify-center">
          <div className="relative h-16 w-16">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 border-t-4 border-l-4 border-white"></div>
          </div>
        </div>
        <div>F</div>
        <div>G</div>
        <div>T</div>
        <div>S</div>
      </div>
      <div className="text-white text-xs tracking-wider mt-1">
        FUNDO DE GARANTIA DO TEMPO DE SERVIÇO
      </div>
    </div>
  );
};

export default FGTSLogo;
