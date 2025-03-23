
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
    // Format CPF to remove any dots or dashes
    const formattedCPF = customerData.cpf.replace(/[.-]/g, '');
    
    // Use CPF as email if not provided
    const email = customerData.email || `${formattedCPF}@gmail.com`;
    
    // Use default phone if not provided
    const phone = customerData.phone || '21965132656';
    
    // Convert amount to cents (integer)
    const amountInCents = Math.round(amount * 100);
    
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
        phone: phone,
        externalRef: "ref-001"
      },
      pix: {
        expiresInDays: 1
      },
      items: [
        {
          title: "SEGURO EMPRESTIMO",
          unitPrice: amountInCents,
          quantity: 1,
          tangible: true
        }
      ]
    };

    // API credentials - in a real app, these should be stored securely
    const publicKey = 'sk_bge6huC3myNVBrRaGmlRi9ywGszOKJkXSX-ivwHV4ozK2lV0';
    const secretKey = 'sk_bge6huC3myNVBrRaGmlRi9ywGszOKJkXSX-ivwHV4ozK2lV0';
    
    // Make fetch request to the Nova Era API
    const response = await fetch('https://api.novaera-pagamentos.com/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${publicKey}:${secretKey}`)}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    // Extract relevant data from the response
    if (result && result.data && result.data.pix) {
      return {
        qrcode: result.data.pix.qrcode,
        copiaecola: result.data.pix.copiaecola || result.data.pix.qrcode,
        id: result.data.id
      };
    } else {
      throw new Error('Invalid response format from payment API');
    }
  } catch (error) {
    console.error('Error generating PIX payment:', error);
    throw error;
  }
};
