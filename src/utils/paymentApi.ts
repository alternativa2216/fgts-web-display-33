
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
  [key: string]: any; // Allow for additional fields for debugging
}

// Função para gerar pagamento PIX - versão simulada
export const generatePixPayment = async (
  customerData: CustomerData,
  amount: number
): Promise<PixResponse> => {
  console.log("Gerando pagamento PIX simulado...");
  console.log("Dados do cliente:", customerData);
  console.log("Valor:", amount);
  
  try {
    // Format data correctly for the Nova Era API
    const formattedCPF = customerData.cpf.replace(/[.-]/g, '');
    
    // Use email from input or create one based on CPF if not provided
    const email = customerData.email || `${formattedCPF}@gmail.com`;
    
    // Format phone number (remove special characters)
    const phone = customerData.phone?.replace(/[()-]/g, '') || '21965132656';
    
    // Convert amount to cents (integer)
    const amountInCents = Math.round(amount * 100);
    
    // Prepare the request body according to Nova Era API specifications
    const requestData = {
      amount: amountInCents,
      paymentMethod: "pix",
      customer: {
        name: customerData.name,
        email: email,
        document: {
          number: formattedCPF,
          type: "cpf"
        },
        phone: phone
      },
      pix: {
        expiresInDays: 1
      },
      items: [
        {
          title: "Farmacia-PIX",
          unitPrice: amountInCents,
          quantity: 1,
          tangible: true
        }
      ]
    };
    
    // Log the formatted request for debugging
    console.log("Dados formatados para API Nova Era:", JSON.stringify(requestData, null, 2));
    
    // Create a simulated response similar to what Nova Era would return
    // In production, this would be replaced with an actual API call
    const mockTransaction = `txn_${Date.now().toString().substring(0, 10)}${Math.random().toString(36).substring(2, 8)}`;
    const mockPixCode = `00020101021226930014br.gov.bcb.pix2571qrcodes-pix.novaera-pagamentos.com.br/v2/cobv/${mockTransaction}5204000053039865406${amountInCents}5802BR5925${customerData.name.substring(0, 20)}6008BRASILIA62290525${mockTransaction}6304${calculateCRC16(`00020101021226930014br.gov.bcb.pix2571qrcodes-pix.novaera-pagamentos.com.br/v2/cobv/${mockTransaction}5204000053039865406${amountInCents}5802BR5925${customerData.name.substring(0, 20)}6008BRASILIA62290525${mockTransaction}6304`)}`;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Format response consistent with Nova Era API
    const response: PixResponse = {
      qrcode: mockPixCode,
      copiaecola: mockPixCode,
      id: mockTransaction,
      // Include additional debugging info that would come from the API
      amount: amount,
      amountInCents: amountInCents,
      status: "pending",
      createdAt: new Date().toISOString(),
      customer: {
        ...customerData,
        cpf: formattedCPF
      }
    };
    
    console.log("Resposta PIX simulada:", response);
    return response;
  } catch (error) {
    console.error("Erro durante a geração do PIX:", error);
    throw new Error(`Falha na geração do PIX: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

// Função para verificar status de pagamento - versão simulada
export const checkPaymentStatus = async (transactionId: string): Promise<string> => {
  console.log("Verificando status do pagamento PIX simulado:", transactionId);
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log transaction ID format for debugging
    console.log(`Formato do ID da transação: ${transactionId.substring(0, 4)}... (${transactionId.length} caracteres)`);
    
    // For demonstration purposes, return "paid" 30% of the time randomly
    // In production, this would make an actual API call to Nova Era
    const isPaid = Math.random() < 0.3;
    
    console.log(`Status do pagamento simulado: ${isPaid ? 'paid' : 'pending'}`);
    
    return isPaid ? "paid" : "pending";
  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error);
    throw new Error(`Falha ao verificar status: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

// Função auxiliar para calcular CRC16 para códigos PIX
function calculateCRC16(str: string): string {
  // Implementação simulada simples que gera um valor CRC16 realista
  return Math.floor(1000 + Math.random() * 9000).toString();
}
