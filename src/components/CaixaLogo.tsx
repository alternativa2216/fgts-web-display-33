
import React from 'react';

interface CaixaLogoProps {
  className?: string;
}

const CaixaLogo: React.FC<CaixaLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-white font-bold text-2xl mr-2">CAIXA</div>
      <div className="h-6 w-0.5 bg-white mx-2"></div>
      <div className="text-white text-xs flex flex-col justify-center">
        <span>AGENTE</span>
        <span>OPERADOR</span>
      </div>
    </div>
  );
};

export default CaixaLogo;
