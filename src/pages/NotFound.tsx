
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CaixaLogo from '@/components/CaixaLogo';

const NotFound = () => {
  return (
    <div className="bg-fgts-pattern min-h-screen flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-6 py-8 flex-1 flex flex-col items-center justify-center max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mt-4 mb-8"
        >
          <CaixaLogo className="mx-auto" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-center mb-8"
        >
          <h1 className="text-5xl font-bold">404</h1>
          <p className="text-xl mt-4">Página não encontrada</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/">
            <button className="bg-caixa-orange text-white py-3 px-6 rounded-md text-lg font-medium shadow-lg hover:bg-opacity-90 transition-all duration-300">
              Voltar para página inicial
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
