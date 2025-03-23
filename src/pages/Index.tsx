
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CaixaLogo from '@/components/CaixaLogo';
import FGTSLogo from '@/components/FGTSLogo';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-fgts-pattern min-h-screen flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-6 py-8 flex-1 flex flex-col items-center max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center mt-4"
        >
          <CaixaLogo className="mx-auto" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-center mt-16 mb-10"
        >
          <h1 className="text-3xl font-light">Boas-vindas ao</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 flex justify-center w-full"
        >
          <FGTSLogo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-white text-center mb-12"
        >
          <p className="text-lg">
            Você sabia que o seu <span className="font-bold">FGTS</span> gera{" "}
            <span className="font-bold">empregos</span> e investimentos para o{" "}
            <span>Brasil?</span>
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-caixa-orange text-white py-4 rounded-md text-lg font-medium shadow-lg hover:bg-opacity-90 transition-all duration-300"
          onClick={() => navigate('/login')}
        >
          Entrar no aplicativo
        </motion.button>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          href="#"
          className="text-white mt-8 text-sm underline hover:text-opacity-80 transition-colors duration-300 flex items-center justify-center"
        >
          Veja como o seu FGTS é aplicado
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
};

export default Index;
