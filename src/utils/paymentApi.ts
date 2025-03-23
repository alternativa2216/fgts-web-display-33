
interface CustomerData {
  name: string;
  cpf: string;
  email?: string;
  phone?: string;
}

interface PixResponse {
  qrcode: string;
  copiaecola: string;
  id: string;
}

// Função para gerar pagamento PIX - versão simulada
export const generatePixPayment = async (
  customerData: CustomerData,
  amount: number
): Promise<PixResponse> => {
  console.log("Gerando pagamento PIX simulado...");
  console.log("Dados do cliente:", customerData);
  console.log("Valor:", amount);
  
  // Simulamos um pequeno delay para parecer uma requisição real
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Gerar ID de transação simulado (similar ao formato da API)
  const transactionId = `txn_${Date.now().toString().substring(0, 10)}${Math.random().toString(36).substring(2, 8)}`;
  
  // Criar um código PIX que simula o que viria da API
  const mockPixCode = `00020101021226930014br.gov.bcb.pix2571qrcodes-pix.novaera-pagamentos.com.br/v2/cobv/${transactionId}5204000053039865406${Math.round(amount * 100)}5802BR5925${customerData.name.substring(0, 20)}6008BRASILIA62290525${transactionId}6304${calculateCRC16(`00020101021226930014br.gov.bcb.pix2571qrcodes-pix.novaera-pagamentos.com.br/v2/cobv/${transactionId}5204000053039865406${Math.round(amount * 100)}5802BR5925${customerData.name.substring(0, 20)}6008BRASILIA62290525${transactionId}6304`)}`;
  
  // Registrar resposta simulada para depuração
  console.log("PIX simulado gerado:", {
    transactionId,
    pixCode: mockPixCode.substring(0, 30) + "...",
    customerData
  });
  
  return {
    qrcode: mockPixCode,
    copiaecola: mockPixCode,
    id: transactionId
  };
};

// Função para verificar status de pagamento - versão simulada
export const checkPaymentStatus = async (transactionId: string): Promise<string> => {
  console.log("Verificando status do pagamento PIX simulado:", transactionId);
  
  // Simulamos um pequeno delay para parecer uma requisição real
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Para fins de demonstração, retornamos "paid" 30% das vezes aleatoriamente
  // Isso simula um pagamento bem-sucedido
  return Math.random() < 0.3 ? "paid" : "pending";
};

// Função auxiliar para calcular CRC16 para códigos PIX
function calculateCRC16(str: string): string {
  // Implementação simulada simples que gera um valor CRC16 realista
  return Math.floor(1000 + Math.random() * 9000).toString();
}
