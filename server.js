
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do CORS para permitir requisições do front-end
app.use(cors());
app.use(express.json());

// API Key da Nova Era
const API_KEY = 'sk_G0H0zXMRJGFRSWdXU-gIH3XOyL70m3gADnTIxl8yBJsJ8Rr6';

// Endpoint para gerar pagamento PIX
app.post('/api/generate-pix', async (req, res) => {
  try {
    const { customerData, amount } = req.body;
    
    // Formatar CPF para remover pontos e traços
    const formattedCPF = customerData.cpf.replace(/[.-]/g, '');
    
    // Usar CPF como email se não fornecido
    const email = customerData.email || `${formattedCPF}@gmail.com`;
    
    // Usar telefone padrão se não fornecido
    const phone = customerData.phone || '21965132656';
    
    // Converter valor para centavos (inteiro)
    const amountInCents = Math.round(amount * 100);
    
    // Criar objeto de dados da requisição similar ao exemplo PHP
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

    console.log("Enviando requisição para a API Nova Era...");
    console.log("Dados da requisição:", JSON.stringify(requestData, null, 2));
    
    // Fazer requisição para a API Nova Era
    const response = await fetch('https://api.novaera-pagamentos.com/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestData)
    });
    
    const responseText = await response.text();
    console.log("Resposta da API Nova Era (texto):", responseText);
    
    let data;
    try {
      // Tentar converter a resposta para JSON
      data = JSON.parse(responseText);
      console.log("Resposta da API Nova Era (JSON):", data);
    } catch (jsonError) {
      console.error("Erro ao processar JSON da resposta:", jsonError);
      // Se não for JSON válido, retornar o texto da resposta
      return res.status(500).json({ 
        error: 'Erro ao processar resposta da API',
        details: responseText
      });
    }
    
    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro na API Nova Era',
        details: data
      });
    }
    
    // Se temos uma resposta bem-sucedida, retornar os dados PIX
    if (data && data.pix) {
      return res.json({
        qrcode: data.pix.qrcode,
        copiaecola: data.pix.copiaecola,
        id: data.id
      });
    } else {
      // Se a resposta não contiver os dados esperados
      return res.status(500).json({
        error: 'Resposta da API incompleta',
        details: data
      });
    }
  } catch (error) {
    console.error('Erro ao gerar pagamento PIX:', error);
    res.status(500).json({ error: 'Erro ao processar pagamento', details: error.message });
  }
});

// Endpoint para verificar status do pagamento
app.get('/api/check-payment/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    console.log("Verificando status do pagamento PIX:", transactionId);
    
    // Fazer requisição para a API Nova Era
    const response = await fetch(`https://api.novaera-pagamentos.com/api/v1/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro ao verificar status',
        details: await response.text()
      });
    }
    
    const data = await response.json();
    console.log("Resposta de status da API:", data);
    
    if (data && data.status) {
      return res.json({ status: data.status });
    } else {
      return res.status(500).json({
        error: 'Resposta de status incompleta',
        details: data
      });
    }
  } catch (error) {
    console.error('Erro ao verificar status de pagamento:', error);
    res.status(500).json({ error: 'Erro ao verificar pagamento', details: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
