import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '@/pages/LandingPage'; // Nova página principal
import Layout from '@/components/landing/Layout'; // Novo Layout
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="light" storageKey="decorastillo-theme">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            {/* Outras rotas podem ser adicionadas aqui se necessário no futuro */}
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;