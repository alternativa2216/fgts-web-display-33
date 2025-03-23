
import React from 'react';

interface CaixaLogoProps {
  className?: string;
}

const CaixaLogo: React.FC<CaixaLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://portalgov.online/Caixa_Econômica_Federal_logo.svg.png" 
        alt="Caixa Econômica Federal" 
        className="h-10 w-auto"
      />
    </div>
  );
};

export default CaixaLogo;
