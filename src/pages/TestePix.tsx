
import React, { useState, useEffect } from 'react';
import { generatePixPayment, checkPaymentStatus } from '@/utils/paymentApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';
import { Copy, Check, RefreshCw } from 'lucide-react';

const TestePix = () => {
  // Predefined user data
  const defaultUserData = {
    name: "Jose Teste Silva",
    cpf: "14303498750",
    email: "teste@teste.com",
    phone: "21965138273"
  };

  // State for PIX data
  const [pixCode, setPixCode] = useState<string>('');
  const [pixQrCode, setPixQrCode] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [amount, setAmount] = useState<number>(89.70);
  const [apiResponse, setApiResponse] = useState<any>(null);

  // Generate PIX code
  const handleGeneratePix = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('');
      setApiResponse(null);
      
      toast({
        title: "Gerando código PIX",
        description: "Aguarde enquanto geramos seu código de pagamento...",
      });
      
      // Format CPF for Nova Era API (remove special characters)
      const formattedCpf = defaultUserData.cpf.replace(/[.-]/g, '');
      
      // Prepare customer data object for Nova Era API
      const customerData = {
        name: defaultUserData.name,
        cpf: formattedCpf,
        email: defaultUserData.email,
        phone: defaultUserData.phone?.replace(/[()-]/g, '') // Remove any formatting from phone
      };
      
      console.log("Dados para geração de PIX:", {
        customer: customerData,
        amount: amount
      });
      
      const pixData = await generatePixPayment(customerData, amount);
      
      // Save the entire API response for debugging
      setApiResponse(pixData);
      
      if (pixData.copiaecola && pixData.qrcode) {
        setPixCode(pixData.copiaecola);
        setPixQrCode(pixData.qrcode);
        setTransactionId(pixData.id);
        
        toast({
          title: "Código PIX gerado",
          description: "O código PIX foi gerado com sucesso!",
        });
      } else {
        console.error('Resposta incompleta da API:', pixData);
        toast({
          title: "Erro ao gerar PIX",
          description: "Resposta incompleta da API Nova Era.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Erro ao gerar PIX:', err);
      setApiResponse(err);
      toast({
        title: "Erro ao gerar PIX",
        description: "Não foi possível gerar o código PIX.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check payment status
  const handleCheckStatus = async () => {
    if (!transactionId) {
      toast({
        title: "Erro",
        description: "Nenhuma transação para verificar. Gere um código PIX primeiro.",
        variant: "destructive"
      });
      return;
    }

    try {
      setCheckingStatus(true);
      
      toast({
        title: "Verificando pagamento",
        description: "Aguarde enquanto verificamos o status do pagamento...",
      });
      
      const status = await checkPaymentStatus(transactionId);
      setPaymentStatus(status);
      
      if (status === 'paid') {
        toast({
          title: "Pagamento confirmado!",
          description: "O pagamento foi aprovado com sucesso.",
          variant: "default"
        });
      } else {
        toast({
          title: "Pagamento pendente",
          description: "O pagamento ainda não foi confirmado.",
          variant: "default"
        });
      }
    } catch (err) {
      console.error('Erro ao verificar status:', err);
      toast({
        title: "Erro ao verificar",
        description: "Não foi possível verificar o status do pagamento.",
        variant: "destructive"
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  // Copy PIX code to clipboard
  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
      .then(() => {
        setCopySuccess(true);
        toast({
          title: "Código copiado!",
          description: "O código PIX foi copiado para a área de transferência.",
        });
        
        // Reset copy success after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o código.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 p-4">
      <div className="container mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Teste de Pagamento PIX</h1>
        
        {/* User data card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dados do Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input value={defaultUserData.name} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label>CPF</Label>
                <Input value={defaultUserData.cpf} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={defaultUserData.email} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input value={defaultUserData.phone} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label>Valor (R$)</Label>
                <Input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-white" 
                  step="0.01"
                  min="0.01"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleGeneratePix} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">
                    <RefreshCw size={16} />
                  </span>
                  Gerando...
                </>
              ) : "Gerar Código PIX"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* PIX code card (only shown when a PIX code has been generated) */}
        {pixCode && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Código PIX Gerado</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {/* QR Code */}
              <div className="bg-white p-3 border border-gray-200 rounded-lg mb-4">
                <QRCode 
                  value={pixQrCode} 
                  size={200}
                />
              </div>
              
              {/* PIX code */}
              <div className="w-full mb-4">
                <Label>Copia e Cola:</Label>
                <div className="relative">
                  <textarea
                    value={pixCode}
                    readOnly
                    className="w-full h-24 p-3 pr-12 bg-gray-50 border border-gray-300 rounded text-sm font-mono resize-none"
                  />
                  <button 
                    onClick={handleCopyPix}
                    className="absolute right-2 top-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Copiar código PIX"
                  >
                    {copySuccess ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Transaction ID */}
              <div className="w-full mb-4">
                <Label>ID da Transação:</Label>
                <Input value={transactionId} readOnly className="bg-gray-50 font-mono text-sm" />
              </div>
              
              {/* Payment status */}
              {paymentStatus && (
                <div className={`w-full p-3 rounded ${
                  paymentStatus === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  <p className="font-medium">
                    Status do pagamento: <span className="font-bold uppercase">{paymentStatus}</span>
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCheckStatus} 
                disabled={checkingStatus || !transactionId}
                className="w-full"
                variant="outline"
              >
                {checkingStatus ? (
                  <>
                    <span className="animate-spin mr-2">
                      <RefreshCw size={16} />
                    </span>
                    Verificando...
                  </>
                ) : "Verificar Pagamento"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Debug Info (API Response) */}
        {apiResponse && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resposta da API (Debug)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-xs">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestePix;
