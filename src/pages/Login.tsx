
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import CaixaLogo from '@/components/CaixaLogo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
    navigate('/cpf-check');
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
          <h1 className="text-xl font-medium">Login Caixa</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Informe sua senha:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white text-white px-2 py-2 focus:outline-none"
                required
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-white"
              >
                {showPassword ? 
                  <EyeOff className="h-5 w-5" /> : 
                  <Eye className="h-5 w-5" />
                }
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-caixa-orange text-white py-4 rounded-md text-lg font-medium shadow-lg hover:bg-opacity-90 transition-all duration-300 mb-3"
            type="submit"
          >
            Entrar
          </motion.button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full border border-white text-white py-4 rounded-md text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300 mb-6"
          >
            Voltar
          </button>

          <div className="text-center text-white">
            <p className="mb-2">
              Esqueceu sua senha? <a href="#" className="text-caixa-orange">Recuperar Senha</a>
            </p>
            <a href="#" className="text-caixa-orange">Preciso de ajuda</a>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
