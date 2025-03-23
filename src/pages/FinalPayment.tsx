
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const FinalPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Get data from location state or localStorage
  const storedCPF = localStorage.getItem('userCPF') || '';
  const storedUserName = localStorage.getItem('userName') || '';
  
  const { 
    userName,
    userCPF,
    insuranceAmount,
    transactionId
  } = location.state || {
    userName: storedUserName,
    userCPF: storedCPF,
    insuranceAmount: 48.52
  };
  
  // Use actual values, preferring state values over localStorage
  const actualUserName = userName || storedUserName || "Nome do Cliente";
  const actualCPF = userCPF || storedCPF || "000.000.000-00";
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Store transaction ID in localStorage if available
    if (transactionId) {
      localStorage.setItem('transactionId', transactionId);
    }
  }, [transactionId]);
  
  // Return to dashboard
  const handleReturn = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[100svh] flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
        <div className="h-10"></div> {/* Placeholder for symmetry */}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            O pagamento do seguro no valor de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(insuranceAmount || 48.52)} foi confirmado com sucesso.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-medium text-gray-800">Detalhes do Pagamento:</p>
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              <p><span className="font-medium">Cliente:</span> {actualUserName}</p>
              <p><span className="font-medium">CPF:</span> {actualCPF}</p>
              {transactionId && (
                <p><span className="font-medium">ID da Transação:</span> {transactionId}</p>
              )}
            </div>
          </div>
          
          <p className="text-green-600 font-semibold mb-6">
            Seu empréstimo será processado e liberado nas próximas 24 horas.
          </p>
          
          <Button 
            onClick={handleReturn}
            className="w-full bg-[#005CA9] hover:bg-[#004A87] py-6 rounded-full"
          >
            RETORNAR AO INÍCIO
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 sm:p-6 text-white text-center text-xs opacity-70">
        CAIXA ECONÔMICA FEDERAL © 2023 - Todos os direitos reservados
      </div>
    </div>
  );
};

export default FinalPayment;
