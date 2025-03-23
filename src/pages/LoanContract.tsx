
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, User, Lock, Check } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LoanContract = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Get data from location state
  const { 
    bankLogo, 
    bankName, 
    totalAmount, 
    installmentsCount, 
    installmentValue,
    interestRate
  } = location.state || {
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
    bankName: "Caixa Econômica Federal",
    totalAmount: 10000,
    installmentsCount: 60,
    installmentValue: 250,
    interestRate: 0.018
  };
  
  // Sample user data (in a real app, this would come from an auth context)
  const userName = "JUAREZ JOSE FERNANDES DE FREITAS";
  const userCPF = "123.456.789-00";
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const handleConfirmSignature = () => {
    setSignatureConfirmed(true);
    setShowConfirmation(true);
  };
  
  const handleFinish = () => {
    navigate('/loan-confirmation');
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
        <div className="p-4 sm:p-6">
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
          
          {/* Sign button */}
          <Button 
            className="w-full bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-6 rounded-full"
            onClick={handleConfirmSignature}
            disabled={signatureConfirmed}
          >
            <Lock className="w-5 h-5 mr-2" />
            CONFIRMAR ASSINATURA DE CONTRATO
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {/* Success dialog */}
          <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Contrato Assinado com Sucesso</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-center text-gray-700 mb-6">
                  Sua assinatura foi confirmada e o empréstimo será processado. 
                  O valor será depositado em sua conta em até 24 horas.
                </p>
                <Button 
                  className="bg-[#005CA9] hover:bg-[#004A87] text-white px-6"
                  onClick={handleFinish}
                >
                  Concluir
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LoanContract;
