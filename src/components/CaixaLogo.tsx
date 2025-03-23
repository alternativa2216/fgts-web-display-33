
import React from 'react';

interface CaixaLogoProps {
  className?: string;
}

const CaixaLogo: React.FC<CaixaLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="https://portalgov.online/caixa-branco.png" 
        alt="Caixa Econômica Federal" 
        className="h-12 w-auto"
      />
    </div>
  );
};

export default CaixaLogo;
