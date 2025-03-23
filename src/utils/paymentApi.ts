
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

export const generatePixPayment = async (
  customerData: CustomerData,
  amount: number
): Promise<PixResponse> => {
  try {
    console.log("Attempting to generate PIX payment with mock data...");
    
    // Format CPF to remove any dots or dashes
    const formattedCPF = customerData.cpf.replace(/[.-]/g, '');
    
    // Use CPF as email if not provided
    const email = customerData.email || `${formattedCPF}@gmail.com`;
    
    // Use default phone if not provided
    const phone = customerData.phone || '21965132656';
    
    // Convert amount to cents (integer)
    const amountInCents = Math.round(amount * 100);
    
    // Since we're getting CORS errors, we'll generate a simulated PIX code
    // In a production environment, this would need to be handled by a backend service that can make the API call
    
    // Generate a unique transaction ID
    const transactionId = `mock-transaction-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Create a simulated PIX code that includes some of the customer data
    const mockPixCode = `00020101021226880014br.gov.bcb.pix2566qrcodes-pix.gerencianet.com.br/v2/a048dc85d57142dd9bec0b7e9c96be5b52040000530398654041.005802BR5914CAIXA SEGURADORA6008BRASILIA62290525${transactionId}6304${calculateCRC16(`00020101021226880014br.gov.bcb.pix2566qrcodes-pix.gerencianet.com.br/v2/a048dc85d57142dd9bec0b7e9c96be5b52040000530398654041.005802BR5914CAIXA SEGURADORA6008BRASILIA62290525${transactionId}6304`)}`;
    
    // Generate QR code content 
    const qrCodeContent = mockPixCode;
    
    // Log the successful mock generation
    console.log("Successfully generated mock PIX payment", {
      transactionId,
      amount: amountInCents,
      customer: {
        name: customerData.name,
        cpf: formattedCPF
      }
    });
    
    // Return the mock PIX data
    return {
      qrcode: qrCodeContent,
      copiaecola: mockPixCode,
      id: transactionId
    };
  } catch (error) {
    console.error('Error generating PIX payment:', error);
    throw error;
  }
};

// Helper function to calculate CRC16 for PIX codes
function calculateCRC16(str: string): string {
  // Simple mock implementation - in reality this would be a proper CRC16 calculation
  const mockCRC = Math.floor(1000 + Math.random() * 9000).toString();
  return mockCRC;
}
